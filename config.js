import path from 'path';
import { tmpdir } from 'os';

// WA config
export const WA_AUTH_INFO_DIR = path.join(tmpdir(), 'wa-auth-info');
export const WA_LOCAL_STORE_FILE = path.join(tmpdir(), 'wa-local-store.json');

// Server config
export const PORT = Number(process.env.PORT);
export const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN || '*';
export const CLIENT_APP_URL = process.env.CLIENT_APP_URL;

// MySql config
export const MYSQL_HOST = process.env.MYSQL_HOST;
export const MYSQL_PSWD = process.env.MYSQL_PSWD;
export const MYSQL_PORT = Number(process.env.MYSQL_PORT);
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_DB = process.env.MYSQL_DB;

// VAPID Keys
export const VAPID_PUBLIC = process.env.VAPID_PUBLIC;
export const VAPID_PRIVATE = process.env.VAPID_PRIVATE;
