const express=require('express');
const authRouter=express.Router();
const authController=require('../controllers/auth.controller');
const authMiddleware=require('../middlewares/auth.middlewares');


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post('/register', authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRouter.post('/login', authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear the token cookie and add the token to blacklist
 * @access Public
 */

authRouter.get('/logout', authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the user data of the logged in user
 * @access Private      
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController);


module.exports=authRouter;
