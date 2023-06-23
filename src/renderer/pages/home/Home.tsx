import React from 'react';
import './Home.scss';
import Toggle from '@components/Toggle/Toggle';
import { Alarm, AlarmHelper } from '@models/Alarm'
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
    this.setState({alarms: await AlarmHelper.get()});
  }

  private onAlarmToggle(alarm: Alarm): void {
    alarm.isActive = !alarm.isActive;
    AlarmHelper.update(alarm);
  }

  private handleOpenModal(alarm: Alarm | undefined, index: number) {
    NiceModal.show(AlarmModal, {alarm: alarm}).then(async (res) => {
      let alarms = this.state.alarms;
      const alarm = res as Alarm;

      if (!alarm) {                                               //Delete
        AlarmHelper.delete(alarms[index]);
        alarms.splice(index, 1);
      } else if (index >= 0) {                                    //Update
        AlarmHelper.update(alarm);
        alarms[index] = alarm;
      } else {                                                    //Create
        alarm.rowid = (await AlarmHelper.create(alarm))[0].rowid;
        alarms.push(alarm);
      }
      this.setState({alarms: alarms});
      console.log(alarms);
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
                  <li key={index} className="alarm-item" onClick={(e) => {if ((e.target as HTMLButtonElement).className.startsWith("alarm-item")) this.handleOpenModal(alarm, index);}}>
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