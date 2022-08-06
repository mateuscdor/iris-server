import { getSubscriptions, getSubscriptionByPhone } from './subs.service.js';
import { insertPresenceHistoryRecord } from './presence.service.js';
import {
   jidEncode,
   jidDecode,
} from '@adiwajshing/baileys/lib/WABinary/jid-utils.js';

export async function dispatchPresenceUpdateEvent(event) {
   const jid = event.id;
   const { user: phone } = jidDecode(jid);
   const subslist = await getSubscriptionByPhone('presence.update', phone);
   let props = {},
      status = false,
      lastseen = 0;

   if (event.presences[jid] && typeof event.presences[jid] === 'object') {
      props = event.presences[jid];
   } else {
      return Promise.resolve();
   }

   if ('lastKnownPresence' in props) {
      if (props.lastKnownPresence === 'available') {
         status = true;
      }
   }

   if ('lastSeen' in props && typeof props.lastSeen === 'number') {
      lastseen = props.lastSeen;
   }

   let subsPromises = subslist.map(async (subs) => {
      const sub_id = subs.id;
      const res = await insertPresenceHistoryRecord({
         status,
         lastseen,
         sub_id,
      });

      if (res.affectedRows > 0) {
         console.log(`PRESENCE sub_id=${sub_id} status=${status}`);
      }
   });

   return Promise.all(subsPromises);
}

/**
 * Register presence update event
 * @param {any} socket
 * @returns {Promise<any>}
 */
export async function registerPresenceUpdateEvent(socket) {
   const subslist = await getSubscriptions('presence.update', 5);
   let subsPromises = subslist.map(async (subs) => {
      const jid = jidEncode(subs.phone, 's.whatsapp.net');
      await socket.presenceSubscribe(jid);
      console.log(`SUBSCRIBE [${subs.event}] ${subs.phone}`);
   });

   return Promise.all(subsPromises);
}
