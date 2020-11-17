import express from 'express';

import { signUp, login } from './controllers';

const router = express.Router();

router.post('/signup', signUp);


router.post('/login', login);

export default router;
