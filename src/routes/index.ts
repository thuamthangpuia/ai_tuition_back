import express from 'express';

import { getUserProfileController, updateUserProfileController } from '../controllers/UserController.ts';
import { registerUserController, userLoginController, userLogoutController } from '../controllers/authController.ts';


var router = express.Router();

router.get('/user/create', registerUserController)
router.get('/user/login', userLoginController)
router.get('/user/profile', getUserProfileController)
router.get('/user/logout',userLogoutController)
router.get('/user/profile/update',updateUserProfileController)

export default router

