import { userdata, loanData } from './testdata';

export const users = [];
export const loans = [];
const repayment = [];

export const addDefaultUser = () => {
  userdata.forEach((element) => {
    users.push(element);
  });
};

export const addLoan = () => {
  loanData.forEach((element) => {
    loans.push(element);
  });
};
const defaultAdmin = {
  id: 100,
  email: 'admin@quickcredit.com',
  firstName: 'jude',
  lastName: 'ezekiel',
  password: '$2b$12$Ky0BRqWtU1iDRTWbD6W5g.qjB741a1Ke5jrcWZ0.YheB44re5fBVm',
  address: '2 ikpoh street',
  status: 'verified',
  isAdmin: true,
};

users.push(defaultAdmin);
