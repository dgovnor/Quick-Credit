import express from 'express';
import expressValidate from 'express-validator';
import UserControl from '../controllers/userController';
import LoanValidate from '../middlewares/userLoanValidation';
import Authorisation from '../auth/authorisation';

const userRouter = express.Router();

userRouter.use(expressValidate());

const { applyForLoan } = UserControl;
const { userLoanValidation } = LoanValidate;
const { verifyUser, validateToken } = Authorisation;

userRouter.post(
  '/:id/loans',
  validateToken,
  verifyUser,
  userLoanValidation,
  applyForLoan,
);

export default userRouter;
