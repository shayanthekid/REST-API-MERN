import express from 'express';
import controller from '../controllers/member';

const router = express.Router();

router.post('/register',  controller.register);

export = router;