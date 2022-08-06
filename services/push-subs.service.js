import { mysql } from '../utils/mysql.js';

/**
 * Returns push subscription record by given `id`
 * @param {number} id 
 * @returns {Promise<PushSubscriptionRecord>}
 */
export function getPushSubscription(id) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'SELECT * FROM push_subs WHERE id = ? LIMIT 1;',
         [id],
         (err, res) => {
            if (err) {
               return reject(err);
            }
            resolve(res[0]);
         }
      )
   });
}

/**
 * Returns list of push subscription records
 * @param {number} userId 
 * @returns {Promise<PushSubscriptionRecord[]>}
 */
export function getPushSubscriptionsByUserId(userId) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'SELECT * FROM push_subs WHERE user_id = ? ORDER BY id DESC;',
         [userId],
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
 * Inserts push subscription record 
 * @param {PushSubscriptionRecord} data 
 */
export function insertPushSubscriptionRecord(data) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'INSERT INTO push_subs(user_agent, payload, user_id) VALUES(?, ?, ?);',
         [data.user_agent, JSON.stringify(data.payload), data.user_id],
         (err, res) => {
            if (err) {
               return reject(err);
            }

            resolve(res);
         }
      )
   });
}
