import assert from 'assert';
import { disconnect } from '../utils/mysql.js';
import {
   getPushSubscription,
   insertPushSubscriptionRecord,
} from './push-subs.service.js';

const user_agent =
   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36';
const payload = {
   endpoint:
      'https://fcm.googleapis.com/fcm/send/emZ6ck15Wjg:APA91bG1Kyt3tQxmkbJtaG3ESgyi9YH_r1-ggzeXyBKGyPw_ebV27J_ZzgpygIXBDHZpWV2HY8XVyh3gFvZE1GwaSy6HP-fve5_gV9viBzz1pemuNHg5DqDX1ff2tzKKbXs57MIWytWB',
   expirationTime: null,
   keys: {
      p256dh:
         'BAFbi-4C70JJ4XYnuexXicXGpF-sr6EhY6OqbSH6a7XT0G_45in-mY845eVicIDmU0K4TN_18Ss7qYE2y_mzY3c',
      auth: 'Le3Of4S8Fesj32OhjB_aLQ',
   },
};
var pushSubId, user_id = 1;

describe('Push subscription service', function () {
   this.afterAll(function (done) {
      disconnect().then(done).catch(done);
   });

   it('Should insert push subscription record', async function () {
      const res = await insertPushSubscriptionRecord({
         user_agent,
         payload,
         user_id,
      });

      assert.ok(res.insertId > 0, 'incorrect insertId');
      assert.equal(res.affectedRows, 1, 'more rows are affected');
      pushSubId = res.insertId;
   });

   it('Should returns push subscription record', async function() {
      const pushsubs = await getPushSubscription(pushSubId);
      
      assert.equal(pushsubs.id, pushSubId, "incorrect pushSubId");
      assert.equal(pushsubs.enabled, 1, "should be enable");
      assert.ok(typeof pushsubs.payload === 'string', "incorrect payload");
      assert.equal(pushsubs.user_id, user_id, "incorrect user_id");
   });
});
