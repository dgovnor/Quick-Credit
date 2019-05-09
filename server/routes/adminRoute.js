import express from 'express';
import expressValidate from 'express-validator';
import UserControl from '../controllers/adminController';
import UserValidate from '../middlewares/userValidation';
import adminValidate from '../middlewares/adminValidation';
import Authorisation from '../auth/authorisation';

const adminRouter = express.Router();

adminRouter.use(expressValidate());

const {
  adminVerifyUser, AdminPostRepayment, approveOrRejectLoan, getSpecificUser,
  getLoan, getSpecificLoan,
} = UserControl;
const { adminVerifyUserValidation } = UserValidate;
const {
  repaymentLoanValidation, getSpecificUserValidation, approveOrRejectValidation,
  getSpecificLoanValidation, getLoanValidation,
} = adminValidate;
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
adminRouter.patch(
  '/:id/loans/:loanid',
  validateToken,
  verifyAdmin,
  approveOrRejectValidation,
  approveOrRejectLoan,
);
adminRouter.get(
  '/:id/loans/:loanid',
  validateToken,
  verifyAdmin,
  getSpecificLoanValidation,
  getSpecificLoan,
);
adminRouter.get(
  '/:id/loans',
  validateToken,
  verifyAdmin,
  getLoanValidation,
  getLoan,
);
adminRouter.get(
  '/:id/users/:email',
  validateToken,
  verifyAdmin,
  getSpecificUserValidation,
  getSpecificUser,
);

export default adminRouter;
