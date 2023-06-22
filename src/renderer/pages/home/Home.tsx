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
    //TODO: Save in Database
  }

  /*
   * Modal Management
   */

  handleOpenModal(alarm: Alarm | undefined, index: number) {
    NiceModal.show(AlarmModal, {alarm: alarm}).then((alarm) => {
      let alarms = this.state.alarms;

      if (!alarm) {                     //Delete
        alarms.splice(index, 1);
      } else if (index >= 0) {          //Update
        alarms[index] = alarm as Alarm;
      } else {                          //Create
        alarms.push(alarm as Alarm);
      }
      this.setState({alarms: alarms});
      //TODO: Save in Database
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