import express from 'express';
import expressValidate from 'express-validator';
import UserControl from '../controllers/homeController';
import UserValidate from '../middlewares/userValidation';

const userRouter = express.Router();

userRouter.use(expressValidate());

const { signupUser, loginUser } = UserControl;
const { signupValidation, loginValidation } = UserValidate;

// default route
userRouter.get('/', (_req, res) => res.status(301).redirect('/api/v1'));
userRouter.post('/', (_req, res) => res.status(301).redirect('/api/v1'));
userRouter.get('/api/v1', (_req, res) => res.status(200).send({
  status: res.statusCode,
  message: 'Welcome to Quick Credit',
}));
userRouter.post('/api/v1', (_req, res) => res.status(200).send({
  status: res.statusCode,
  message: 'Welcome to Quick Credit',
}));

// Create user account route
userRouter.post('/auth/signup', signupValidation, signupUser);

// login user route index
userRouter.post('/auth/signin', loginValidation, loginUser);

export default userRouter;
