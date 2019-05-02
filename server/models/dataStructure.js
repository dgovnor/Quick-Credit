import { userdata } from './testdata';

export const users = [];
// eslint-disable-next-line no-unused-vars
const loans = [];
// eslint-disable-next-line no-unused-vars
const repayment = [];

export const addDefaultUser = () => {
  userdata.forEach((element) => {
    users.push(element);
  });
};
