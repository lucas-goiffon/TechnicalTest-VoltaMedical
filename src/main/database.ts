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

//TODO: Remove (testing purpose)
db.serialize(() => {
  db.run("INSERT INTO Alarms VALUES (?, ?, ?);", ['Example Alarm', '10:40', false]);
});

export default db;