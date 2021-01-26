import express from 'express';
import { authUser,getProfile,registerUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',authUser);
router.route('/profile').get(protect,getProfile);


export default router;