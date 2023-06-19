import sqlite3 from 'sqlite3';
import path from 'path';

const db = new sqlite3.Database(path.resolve(__dirname, '../../database/alarms.db'), (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  }
});

// create a table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS Alarms (label, time, isActive);");
});

//Insert an example if starting app with an empty database
//TODO: Find a way to do it only on the first start
db.all("SELECT COUNT(*) AS number FROM Alarms;", (err, row: any[]) => {
  if (row[0].number < 1) {
    db.serialize(() => {
      db.run("INSERT INTO Alarms VALUES (?, ?, ?);", ['Example Alarm', '23:42', false]);
    });
  }
})

export default db;