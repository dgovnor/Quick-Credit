import { userdata, loanData } from './testdata';

export const users = [];
export const loans = [];
export const repayment = [];
export const loanRepayment = [];

export const addDefaultUser = () => {
  userdata.forEach((element) => {
    users.push(element);
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

const defaultUser = {
  id: 200,
  email: 'andela@quickcredit.com',
  firstName: 'jude',
  lastName: 'ezekiel',
  password: '$2b$12$Ky0BRqWtU1iDRTWbD6W5g.qjB741a1Ke5jrcWZ0.YheB44re5fBVm',
  address: '2 ikpoh street',
  status: 'unverified',
  isAdmin: false,
};
users.push(defaultUser);
