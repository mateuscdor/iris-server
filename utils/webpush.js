import { CLIENT_APP_URL, VAPID_PUBLIC, VAPID_PRIVATE } from '../config.js';
import wp from 'web-push';

export function webpush() {
   return wp;
}

export function configureWebPush() {
   wp.setVapidDetails(CLIENT_APP_URL, VAPID_PUBLIC, VAPID_PRIVATE);
}
