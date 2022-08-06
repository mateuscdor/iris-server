import { mysql } from '../utils/mysql.js'

/**
 * Returns list of presence history record
 * @param {number} subId 
 * @returns {Promise<PresenceHistory[]>}
 */
export function getPresenceHistoryBySubId(subId) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'SELECT * FROM pres_hist WHERE sub_id = ? ORDER BY id;',
         [subId],
         (err, res) => {
            if (err) {
               return reject(err);
            }

            resolve(res);
         }
      )
   });
}

/**
 * Inserts presence history record
 * @param {PresenceHistory} data 
 */
export function insertPresenceHistoryRecord(data) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'INSERT INTO pres_hist(status, lastseen, sub_id) VALUES (?, ?, ?);',
         [data.status, data.lastseen, data.sub_id],
         (err, res) => {
            if (err) {
               return reject(err);
            }

            resolve(res);
         }
      )
   });
}
