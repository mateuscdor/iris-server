import express from 'express';
import cors from 'cors';
import { PORT, CORS_ALLOWED_ORIGIN } from '../config.js';
import router from '../routes/routes.js';

/** @type {import('express').Application} */
var app;

/** @type {import('http').Server} */
var server;

export function startHttpServer() {
   return new Promise((resolve, reject) => {
      if (app && server) {
         resolve(server);
      }
   
      app = express();
   
      app.use(express.json({ limit: '32mb' }));
      app.use(
         cors({
            origin: CORS_ALLOWED_ORIGIN,
            allowedHeaders: ['Authorization', 'Content-Type', 'X-Api-Key'],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
         })
      );
      app.use(router);
   
      server = app.listen(PORT);
      server.on('error', (err) => {
         console.log("Couldn't start server", err);
         reject(err);
      });
      server.on('listening', () => {
         console.log(`Server running on port ${PORT}`);
         resolve(server);
      });
   });
}

export function stopHttpServer() {
   return new Promise((resolve, reject) => {
      if (!server) {
         return resolve(true);
      }

      server.close((err) => {
         if (err) {
            return reject(err);
         }

         resolve(true);
      })
   });
}
