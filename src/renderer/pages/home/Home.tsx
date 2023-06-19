import React from 'react';
import './Home.scss';
import AlarmRows from './AlarmRows';

class Home extends React.Component {
  alarms: [];

  constructor(props: any) {
    super(props);

    this.alarms = [];
    this.getAlarms();
  }

  private async getAlarms() {
    this.alarms = await window.electron.ipcRenderer.invoke('db-query', "SELECT * FROM Alarms;");
  }

  render() {
    return (
      <div className="main-page">
        <div className="main-page__header">
          <h3> Alarms </h3>
          <button> + </button>
        </div>
        <AlarmRows alarms={this.alarms} />
      </div>
    );
  }
}

export default Home;