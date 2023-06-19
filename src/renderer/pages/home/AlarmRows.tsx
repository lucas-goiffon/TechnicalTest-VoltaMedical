import React from 'react';
import Toggle from '@components/Toggle/Toggle';

type AlarmProps = {
  label: string;
  time: string;
  isActive: boolean;
}

class AlarmRows extends React.Component<{alarms: AlarmProps[]}> {
  constructor(props: {alarms: AlarmProps[]}) {
    super(props);
  }

  onAlarmToggle(alarm: AlarmProps): void {
    alarm.isActive = !alarm.isActive;
  }
  
  render() {
    return (
      <ul className="alarms-holder">
      {
        this.props.alarms.map((alarm: AlarmProps) => {
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
          )
        })
      }
      </ul>
    );
  }
}

export default AlarmRows;