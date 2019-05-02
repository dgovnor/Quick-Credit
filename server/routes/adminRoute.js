// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import expressValidate from 'express-validator';
import UserControl from '../controllers/adminController';
import UserValidate from '../middlewares/userValidation';
import Authorisation from '../auth/authorisation';

const adminRouter = express.Router();

adminRouter.use(expressValidate());

const { adminVerifyUser } = UserControl;
const { adminVerifyUserValidation } = UserValidate;
const { verifyAdmin } = Authorisation;

adminRouter.patch(
  '/:id/users/:email/verify',
  verifyAdmin,
  adminVerifyUserValidation,
  adminVerifyUser,
);

export default adminRouter;
