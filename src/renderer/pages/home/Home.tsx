import React from 'react';
import './Home.scss';
import Toggle from '@components/Toggle/Toggle';
import { Alarm, AlarmHelper } from '@models/Alarm'
import NiceModal from "@ebay/nice-modal-react";
import toast from 'react-hot-toast';
import AlarmModal from '@modals/AlarmModal';

class Home extends React.Component<{}, {alarms: Alarm[]}> {
  constructor(props: any) {
    super(props);

    //Using states to re-render on change
    this.state = {
      alarms: []
    };
    this.getAlarms();
    this.startClock();
  }

  private startClock() {
    let me = this;

    setInterval(() => {
      let time = new Date().toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit"});

      me.state.alarms.map((alarm: Alarm) => {
        if (alarm.isActive && alarm.time == time) {
          toast(`It's time! [${alarm.label}]`, {duration: 5000, style: {fontFamily: "Arial"}, icon: '⏰'});
        }
      });
    }, 60000); //Every minutes
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