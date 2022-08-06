import { mysql } from '../utils/mysql.js';

/**
 * Returns user record by given `id`
 * @param {number} id 
 * @returns {Promise<User>}
 */
export function getUserById(id) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'SELECT * FROM users WHERE id = ? LIMIT 1;',
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
 * Inserts new user record
 * @param {User} data
 */
export function createUser(data) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'INSERT INTO users (fullname, email, pswd) VALUES (?, ?, ?);',
         [data.fullname, data.email, data.pswd],
         (err, result) => {
            if (err) {
               return reject(err);
            }

            resolve(result);
         }
      );
   });
}

/**
 * Updates user record by given `id`
 * @param {number} id 
 * @param {Partial<Omit<User, 'id'|'created_at'>>} data 
 */
export function updateUserById(id, data) {
   return new Promise((resolve, reject) => {
      delete data['id'];
      delete data['created_at'];

      mysql().query(
         'UPDATE users SET ? WHERE id = ? LIMIT 1',
         [data, id],
         (err, res) => {
            if (err) {
               return reject(err);
            }

            resolve(res);
         }
      )
   })
}

/**
 * Deletes user record by specified `id`
 * @param {number} id 
 */
export function deleteUserById(id) {
   return new Promise((resolve, reject) => {
      mysql().query(
         'DELETE FROM users WHERE id = ? LIMIT 1;',
         [id],
         (err, res) => {
            if (err) {
               return reject(err);
            }

            resolve(res);
         }
      );
   });
}
