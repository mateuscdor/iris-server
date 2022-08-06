import { startWASocket } from './sockets/wa.socket.js';
import { startHttpServer, stopHttpServer } from './server/http.server.js';
import { configureWebPush } from './utils/webpush.js';
import { disconnect } from './utils/mysql.js';

(async function() {
   await startWASocket();
   await startHttpServer();
   configureWebPush();

   process.on('SIGINT', async () => {
      try {
         await stopHttpServer();
         await disconnect();
      } catch (error) {
         console.log("Couldn't stop Server");
         return process.exit(1);
      }

      process.exit(0);
   });
}());
