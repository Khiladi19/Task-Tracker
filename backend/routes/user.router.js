import express from 'express';
import { signup, login ,userProfile} from '../controllers/user.controllers.js';
import { Authenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile',Authenticated,userProfile)


export default router;
