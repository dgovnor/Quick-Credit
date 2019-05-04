import express from 'express';
import expressValidate from 'express-validator';
import UserControl from '../controllers/adminController';
import UserValidate from '../middlewares/userValidation';
import adminValidate from '../middlewares/adminValidation';
import Authorisation from '../auth/authorisation';

const adminRouter = express.Router();

adminRouter.use(expressValidate());

const { adminVerifyUser, AdminPostRepayment } = UserControl;
const { adminVerifyUserValidation } = UserValidate;
const { repaymentLoanValidation } = adminValidate;
const { verifyAdmin, validateToken } = Authorisation;

adminRouter.patch(
  '/:id/users/:email/verify',
  validateToken,
  verifyAdmin,
  adminVerifyUserValidation,
  adminVerifyUser,
);
adminRouter.post(
  '/:id/loans/:loanid/repayment',
  validateToken,
  verifyAdmin,
  repaymentLoanValidation,
  AdminPostRepayment,
);

export default adminRouter;
