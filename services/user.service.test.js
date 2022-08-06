import assert from 'assert';
import { disconnect } from '../utils/mysql.js';
import {
   getUserById,
   createUser,
   updateUserById,
   deleteUserById,
} from './user.service.js';

var userId,
   fullname = '',
   email = '',
   pswd = '';

describe('User service', function () {
   this.beforeAll((done) => {
      const rand = Math.floor(Math.random() * 10e6);
      fullname = `Test User ${rand}`;
      email = `test${rand}@example.com`;
      pswd = `test@${rand.toString(16)}`;
      done(null);
   });

   this.afterAll(function (done) {
      disconnect().then(done).catch(done);
   });

   it('Should insert new user record', async function () {
      const res = await createUser({
         fullname,
         email,
         pswd,
      });

      assert.ok(res.insertId > 0, 'incorrect insertId');
      assert.equal(res.affectedRows, 1, 'more rows are affectedRows');
      userId = res.insertId;
   });

   it('Should returns user record', async function () {
      const user = await getUserById(userId);

      assert.equal(user.id, userId, 'incorrect userId');
      assert.equal(user.fullname, fullname, 'incorrect fullname');
      assert.equal(user.email, email, 'incorrect email');
      assert.equal(user.verified, false, 'new user should not be verified');
      assert.equal(user.plan, 'FREE', 'allocate FREE plan to new user');
   });

   it('Should update user record', async function () {
      fullname = `Test User ${Date.now()}`;
      const res = await updateUserById(userId, { fullname });
      assert.equal(res.affectedRows, 1, 'more rows are affected');

      const user = await getUserById(userId);
      assert.equal(user.fullname, fullname, 'user not updated');
   });

   it('Should delete user record', async function () {
      const res = await deleteUserById(userId);      
      assert.equal(res.affectedRows, 1, 'more rows are affected');

      const user = await getUserById(userId);
      assert.ok(!user, 'user record still exists');
   });
});
