import express from 'express';

import { registerUserController, userLoginController, userLogoutController, userProfileController } from '../controllers/UserController.ts';


var router = express.Router();

router.get('/user/create', registerUserController)
router.get('/user/login', userLoginController)
router.get('/user/profile', userProfileController)
router.get('/user/logout',userLogoutController)

export default router

