import React from 'react';
import './Home.scss';
import Toggle from '@components/Toggle/Toggle';
import Alarm from '@models/Alarm'
import NiceModal from "@ebay/nice-modal-react";
import AlarmModal from '@modals/AlarmModal';

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

  /*
   * Modal Management
   */

  handleOpenModal(alarm: Alarm | undefined, index: number) {
    NiceModal.show(AlarmModal, {alarm: alarm}).then((alarm) => {
      let alarms = this.state.alarms;
      if (index >= 0) {
        alarms[index] = alarm as Alarm;
      } else {
        alarms.push(alarm as Alarm);
      }
      this.setState({alarms: alarms});
      //TODO: Add in Database
    });
  }

  render() {
    return (
      <div className="main-page">
        <div className="main-page__header">
          <h3> Alarms </h3>
          <button onClick={() => this.handleOpenModal(undefined, -1)}> + </button>
        </div>
        <ul className="alarms-holder">
            {
              this.state.alarms.map((alarm: Alarm, index: number) => {
                return (
                  <li key={index} className="alarm-item">
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