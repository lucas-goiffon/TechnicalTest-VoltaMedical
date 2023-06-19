import React from 'react';
import './Home.scss';
import Toggle from '@components/Toggle/Toggle';

type Alarm = {
  label: string;
  time: string;
  isActive: boolean;
}

class Home extends React.Component {
  mockAlarms: Alarm[];

  constructor(props: any) {
    super(props);

    this.mockAlarms = [ //TODO: Get data from Database
      {
        label: 'Alarm',
        time: '10:50',
        isActive: true
      },
      {
        label: 'Alarm 2',
        time: '07:50',
        isActive: false
      },
      {
        label: 'Alarm 3',
        time: '18:50',
        isActive: false
      },
    ];
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
              this.mockAlarms.map((alarm: Alarm) => (
                <li className="alarm-item">
                  <div style={{display: "grid"}}>
                    <span className="alarm-item__time">{ alarm.time }</span>
                    <span className="alarm-item__label">{ alarm.label }</span>
                  </div>

                  <div className="alarm-item__toggle">
                    <Toggle checked={alarm.isActive} handler={() => this.onAlarmToggle(alarm)}/>
                  </div>
                </li>
              ))
            }
          </ul>
      </div>
    );
  }
}

export default Home;