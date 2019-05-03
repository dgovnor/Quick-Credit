import express from 'express';
import expressValidate from 'express-validator';
import UserControl from '../controllers/adminController';
import UserValidate from '../middlewares/userValidation';
import Authorisation from '../auth/authorisation';

const adminRouter = express.Router();

adminRouter.use(expressValidate());

const { adminVerifyUser } = UserControl;
const { adminVerifyUserValidation } = UserValidate;
const { verifyAdmin, validateToken } = Authorisation;

adminRouter.patch(
  '/:id/users/:email/verify',
  validateToken,
  verifyAdmin,
  adminVerifyUserValidation,
  adminVerifyUser,
);

export default adminRouter;
