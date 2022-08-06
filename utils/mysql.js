import mysql2 from 'mysql2';
import {
   MYSQL_HOST,
   MYSQL_PORT,
   MYSQL_USER,
   MYSQL_PSWD,
   MYSQL_DB,
} from '../config.js';

/** @type {mysql2.Connection} */
var connection = null;

export function mysql() {
   if (!connection) {
      connect();
   }
   return connection;
}

export function connect() {
   connection = mysql2.createConnection({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PSWD,
      database: MYSQL_DB,
      multipleStatements: true,
   });
}

export function disconnect() {
   return new Promise((resolve, reject) => {
      if (!connection) {
         return resolve();
      }

      connection.end((err) => {
         if (err) {
            return reject(err);
         }

         connection = null;
         resolve();
      });
   });
}
