import { Router } from 'express';
import { send200Response } from '../utils/http.js';

const router = Router();

router.get('/ping', function(req, res) {
   send200Response(res, "Pong!", null);
});

export default router;
