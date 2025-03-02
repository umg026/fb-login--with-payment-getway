import express from 'express';
import { handelUserLogin, handelUserSignup, handelFaceBookLogin } from '../controller/authController.js'
import { protectRoute } from '../middleware/checkAuth.js';
const authRouter = express.Router();


authRouter.post('/signup', handelUserSignup);
authRouter.post('/login', handelUserLogin);
authRouter.post('/facebook-login',handelFaceBookLogin );

export { authRouter };
