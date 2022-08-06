import assert from 'assert';
import { disconnect } from '../utils/mysql.js';
import {
   getSubscriptionById,
   createSubscription,
   updateSubscription,
   deleteSubscription,
} from './subs.service.js';

var subId,
   alias = '',
   phone = '',
   userId;

/** @type {SubscriptionEvent} */
var event;

describe('Subscription service', function () {
   this.beforeAll(function (done) {
      const rand = Math.floor(Math.random() * 10e6);
      alias = `Sub user ${rand}`;
      phone = '101010101010';
      event = 'presence.update';
      userId = 1;
      done(null);
   });

   this.afterAll(function (done) {
      disconnect().then(done).catch(done);
   });

   it('Should insert new subscription record', async function () {
      const res = await createSubscription({
         alias,
         event,
         phone,
         user_id: userId,
      });

      assert.ok(res.insertId > 0, 'incorrect insertId');
      assert.equal(res.affectedRows, 1, 'more rows are affected');
      subId = res.insertId;
   });

   it('Should returns subscription record', async function () {
      const subs = await getSubscriptionById(subId);

      assert.equal(subs.id, subId, 'incorrect subId');
      assert.equal(subs.enabled, true, 'should be enable');
      assert.equal(subs.alias, alias, 'incorrect alias');
      assert.equal(subs.event, event, 'incorrect event');
      assert.equal(subs.notify, true, 'notify should be enable');
      assert.equal(subs.phone, phone, 'incorrect phone');
      assert.equal(subs.user_id, userId, 'incorrect userId');
   });

   it('Should update subscription record', async function () {
      alias = 'New alias';
      const res = await updateSubscription(subId, { alias });
      assert.equal(res.affectedRows, 1, 'more rows are affected');

      const subs = await getSubscriptionById(subId);
      assert.equal(subs.id, subId, "subId is affected");
      assert.equal(subs.user_id, userId, "userId is affected");
      assert.equal(subs.alias, alias, 'alias not updated');
   });

   it('Should delete subscription record', async function () {
      const res = await deleteSubscription(subId);
      assert.equal(res.affectedRows, 1, 'more rows are affected');

      const subs = await getSubscriptionById(subId);
      assert.ok(!subs, 'subscription record still exists');
   });
});
