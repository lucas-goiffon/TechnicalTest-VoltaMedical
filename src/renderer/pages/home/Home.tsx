import React from 'react';
import './Home.scss';
import Toggle from '@components/Toggle/Toggle';

type Alarm = {
  label: string;
  time: string;
  isActive: boolean;
}

class Home extends React.Component<{}, {alarms: Alarm[]}> {
  constructor(props: any) {
    super(props);

    //Using states to re-render on change
    this.state = {
      alarms: []
    };
    this.getAlarms();
  }

  private async getAlarms() {
    this.setState({alarms: await window.electron.ipcRenderer.invoke('db-query', "SELECT * FROM Alarms;")});
  }

  onAlarmToggle(alarm: Alarm): void {
    alarm.isActive = !alarm.isActive;
  }

  render() {
    return (
      <div className="main-page">
        <div className="main-page__header">
          <h3> Alarms </h3>
          <button> + </button>
        </div>
        <ul className="alarms-holder">
            {
              this.state.alarms.map((alarm: Alarm) => {
                return (
                  <li className="alarm-item">
                    <div style={{display: "grid"}}>
                      <span className="alarm-item__time">{ alarm.time }</span>
                      <span className="alarm-item__label">{ alarm.label }</span>
                    </div>

                    <div className="alarm-item__toggle">
                      <Toggle checked={alarm.isActive} handler={() => this.onAlarmToggle(alarm)}/>
                    </div>
                  </li>
              )})
            }
          </ul>
      </div>
    );
  }
}

export default Home;