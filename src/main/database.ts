import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const databasePath = path.resolve(__dirname, '../../database/alarms.db');
const isDatabaseCreation = fs.existsSync(databasePath);
const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  }
});

// create a table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS Alarms (label, time, isActive);");
});

//Insert an example if starting app for the first time
if (!isDatabaseCreation) {
  db.serialize(() => {
    db.run("INSERT INTO Alarms VALUES (?, ?, ?);", ['Example Alarm', '23:42', false]);
  });
}

export default db;