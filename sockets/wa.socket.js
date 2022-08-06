import makeWASocket, {
   DisconnectReason,
   fetchLatestBaileysVersion,
   makeInMemoryStore,
   useMultiFileAuthState,
} from '@adiwajshing/baileys';
import { WA_AUTH_INFO_DIR, WA_LOCAL_STORE_FILE } from '../config.js';
import {
   registerPresenceUpdateEvent,
   dispatchPresenceUpdateEvent,
} from '../services/observer.service.js';

/** @type {import('@adiwajshing/baileys').MessageRetryMap} */
const msgRetryCounterMap = {};

const store = makeInMemoryStore({});

if (store) {
   store.readFromFile(WA_LOCAL_STORE_FILE);

   // save every 10s
   setInterval(() => {
      store.writeToFile(WA_LOCAL_STORE_FILE);
   }, 10_000);
}

export async function startWASocket() {
   const { state, saveCreds } = await useMultiFileAuthState(WA_AUTH_INFO_DIR);
   const { version } = await fetchLatestBaileysVersion();

   // @ts-ignore
   const sock = makeWASocket.default({
      version,
      printQRInTerminal: true,
      auth: state,
      msgRetryCounterMap,
      getMessage: async (key) => {
         if (store) {
            const msg = await store.loadMessage(
               key.remoteJid,
               key.id,
               undefined
            );
            return msg?.message || undefined;
         }
         return { conversation: 'hello' };
      },
   });

   store?.bind(sock.ev);

   sock.ev.process(async (events) => {
      if (events['connection.update']) {
         const update = events['connection.update'];
         const { connection, lastDisconnect } = update;
         if (connection === 'close') {
            if (
               // @ts-ignore
               lastDisconnect.error.output.statusCode !==
               DisconnectReason.loggedOut
            ) {
               startWASocket();
            } else {
               console.log("'Connection closed. You are logged out.");
            }
         }

         if (connection === 'open') {
            try {
               await registerPresenceUpdateEvent(sock);
            } catch (error) {
               console.error("Couldn't get presence", error);
            }
         }
      }

      if (events['creds.update']) {
         await saveCreds();
      }

      if (events['presence.update']) {
         const event = events['presence.update'];
         await dispatchPresenceUpdateEvent(event);
      }
   });

   return sock;
}
