import express from 'express';
import { authUser,getProfile,registerUser,updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',authUser);
router.route('/profile').get(protect,getProfile).put(protect,updateUserProfile);


export default router;