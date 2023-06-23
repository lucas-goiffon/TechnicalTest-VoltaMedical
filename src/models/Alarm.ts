type Alarm = {
  rowid?: number,
  label: string;
  time: string; //Should probably split hours and minutes
  isActive: boolean;
}

class AlarmHelper {
  static get(id: number|null = null): Promise<Alarm[]> {
    if (id === null) {
      return window.electron.ipcRenderer.invoke('db-query', "SELECT rowid, * FROM Alarms;");
    }
    return window.electron.ipcRenderer.invoke('db-query', `SELECT rowid, * FROM Alarms WHERE rowid = ${id};`);
  }

  static async create(alarm: Alarm): Promise<any> {
    let res = await window.electron.ipcRenderer.invoke('db-query', `INSERT INTO Alarms (label, time, isActive) VALUES ("${alarm.label}", "${alarm.time}", ${alarm.isActive});`);
    if (typeof(res) != "object" ) {
      console.error("SQL Insert failed: ", res);
    }
    return (window.electron.ipcRenderer.invoke('db-query', `SELECT LAST_INSERT_ROWID() AS rowid;`));
  }

  static async update(alarm: Alarm) {
    let res = await window.electron.ipcRenderer.invoke('db-query', `UPDATE Alarms SET label="${alarm.label}", time="${alarm.time}", isActive=${alarm.isActive} WHERE rowid=${alarm.rowid};`);
    if (typeof(res) != "object" ) {
      console.error("SQL Delete failed: ", res);
    }
  }

  static async delete(alarm: Alarm) {
    let res = await window.electron.ipcRenderer.invoke('db-query', `DELETE FROM Alarms WHERE rowid=${alarm.rowid};`);
    if (typeof(res) != "object" ) {
      console.error("SQL Delete failed: ", res);
    }
  }
}

export {Alarm, AlarmHelper};