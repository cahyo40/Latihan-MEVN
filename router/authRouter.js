import express from 'express';
import { Register, Login, Logout, GetProfile } from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router();


router.post('/register', Register)
router.post('/login', Login)
router.get('/logout', Logout)
router.get('/get-profile', authMiddleware, GetProfile)


export default router;
