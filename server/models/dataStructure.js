import { userdata, removeData } from './testdata';

export const users = [];
export const loans = [];
export const repayment = [];
export const loanRepayment = [];

export const addDefaultUser = () => {
  userdata();
  // userdata.forEach((element) => {
  //   users.push(element);
  // });
};
export const removesData = () => {
  removeData();
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

const defaultUser2 = {
  id: 300,
  email: 'jude4@gmail.com',
  firstName: 'jude',
  lastName: 'ezekiel',
  password: '$2b$12$Ky0BRqWtU1iDRTWbD6W5g.qjB741a1Ke5jrcWZ0.YheB44re5fBVm',
  address: '2 ikpoh street',
  status: 'unverified',
  isAdmin: false,
};
users.push(defaultUser2);
const defaultUser3 = {
  id: 400,
  email: 'jude@gmail.com',
  firstName: 'jude',
  lastName: 'ezekiel',
  password: '$2b$12$Ky0BRqWtU1iDRTWbD6W5g.qjB741a1Ke5jrcWZ0.YheB44re5fBVm',
  address: '2 ikpoh street',
  status: 'unverified',
  isAdmin: false,
};
users.push(defaultUser3);
const defaultLoan = {
  id: 578,
  firstName: 'jude',
  lastName: 'kljdflk',
  email: 'jude2@gmail.com',
  tenor: 12,
  createdOn: new Date(),
  amount: 20000,
  interest: 20,
  paymentInstallment: 5,
  status: 'approved',
  repaid: true,
  balance: 1000,

};
loans.push(defaultLoan);

const defaultLoan2 = {
  id: 678,
  firstName: 'chie',
  lastName: 'kljdflk',
  email: 'jude4@gmail.com',
  tenor: 12,
  createdOn: new Date(),
  amount: 20000,
  interest: 20,
  paymentInstallment: 5,
  status: 'approved',
  repaid: false,
  balance: 1000,

};
loans.push(defaultLoan2);

const repaymentLoan = {
  id: 777,
  createdOn: new Date(),
  loadId: 678,
  monthlyInstallment: 7555,
  amount: 200,
};
loanRepayment.push(repaymentLoan);
