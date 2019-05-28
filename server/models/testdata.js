import '@babel/polyfill';
import moment from 'moment';
import authenticate from '../auth/authentication';
import db from '../index';

const values = [
  'test',
  'ezekiel',
  'adminjude@quickcredit.com',
  authenticate.makeHashPassword('combination'),
  '2 ikpoh, street, surulere, lagos',
  'verified',
  'true',
];
const values2 = [
  'test',
  'ezekiel',
  'jude@quickcredit.com',
  authenticate.makeHashPassword('combination'),
  '2 ikpoh, street, surulere, lagos',
  'unverified',
  'false',
];
const values3 = [
  'test',
  'ezekiel',
  'andela4@gmail.com',
  authenticate.makeHashPassword('combination'),
  '2 ikpoh, street, surulere, lagos',
  'unverified',
  'false',
];
const values4 = [
  'test',
  'ezekiel',
  'andela5@gmail.com',
  authenticate.makeHashPassword('combination'),
  '2 ikpoh, street, surulere, lagos',
  'unverified',
  'false',
];
const values5 = [
  'test',
  'ezekiel',
  'andela6@gmail.com',
  authenticate.makeHashPassword('combination'),
  '2 ikpoh, street, surulere, lagos',
  'unverified',
  'false',
];
const values6 = [
  'test',
  'ezekiel',
  'andela7@gmail.com',
  authenticate.makeHashPassword('combination'),
  '2 ikpoh, street, surulere, lagos',
  'unverified',
  'false',
];
const values7 = [
  'test',
  'ezekiel',
  'andela9@gmail.com',
  authenticate.makeHashPassword('combination'),
  '2 ikpoh, street, surulere, lagos',
  'unverified',
  'false',
];
const values8 = [
  'andela9@gmail.com',
  12,
  moment().format('LLL'),
  80000,
  55,
  'approved',
  true,
  0,
  1000,
];
export const userdata = async () => {
  try {
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values);
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values2);
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values3);
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values4);
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values5);
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values6);
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values7);
    await db.query('INSERT INTO loans(useremail,tenor,createdOn,amount,paymentInstallment,status,repaid,balance,interest) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', values8);
  } catch (error) {
    console.log(error);
  }
};
export const removeData = async () => {
  try {
    await db.query('DELETE FROM users WHERE firstname = $1', ['test']);
    await db.query('DELETE FROM loans USING users WHERE users.firstname = $1', ['test']);
    await db.query('DELETE FROM repayment USING loans,users WHERE repayment.loanid = loans.id AND users.firstname = $1 ', ['test']);
  } catch (error) {
    console.log(error);
  }
};

// [


//   // {
//   //   id: 2,
//   //   email: 'andela@gmail.com',
//   //   firstName: 'Andela',
//   //   lastName: 'anthony',
//   //   password: '$2b$12$.PBmTYCHeluKXK.hF/Z14ehY1499NTAIiw51h8qohXOMKwCog1juK',
//   //   address: '34 anthony road',
//   //   status: 'unverified',
//   //   isAdmin: false,
//   // },
//   // {
//   //   id: 3,
//   //   email: 'andela2@gmail.com',
//   //   firstName: 'Andela',
//   //   lastName: 'anthony',
//   //   password: '$2b$12$.PBmTYCHeluKXK.hF/Z14ehY1499NTAIiw51h8qohXOMKwCog1juK',
//   //   address: '34 anthony road',
//   //   status: 'unverified',
//   //   isAdmin: false,
//   // },
//   // {
//   //   id: 4,
//   //   email: 'andela3@gmail.com',
//   //   firstName: 'Andela',
//   //   lastName: 'anthony',
//   //   password: '$2b$12$.PBmTYCHeluKXK.hF/Z14ehY1499NTAIiw51h8qohXOMKwCog1juK',
//   //   address: '34 anthony road',
//   //   status: 'unverified',
//   //   isAdmin: false,
//   // },
//   // {
//   //   id: 5,
//   //   email: 'andela4@gmail.com',
//   //   firstName: 'Andela',
//   //   lastName: 'anthony',
//   //   password: '$2b$12$.PBmTYCHeluKXK.hF/Z14ehY1499NTAIiw51h8qohXOMKwCog1juK',
//   //   address: '34 anthony road',
//   //   status: 'unverified',
//   //   isAdmin: false,
//   // },
//   // {
//   //   id: 6,
//   //   email: 'andela5@gmail.com',
//   //   firstName: 'Andela',
//   //   lastName: 'anthony',
//   //   password: '$2b$12$.PBmTYCHeluKXK.hF/Z14ehY1499NTAIiw51h8qohXOMKwCog1juK',
//   //   address: '34 anthony road',
//   //   status: 'unverified',
//   //   isAdmin: false,
//   // },
//   // {
//   //   id: 7,
//   //   email: 'andela6@gmail.com',
//   //   firstName: 'Andela',
//   //   lastName: 'anthony',
//   //   password: '$2b$12$.PBmTYCHeluKXK.hF/Z14ehY1499NTAIiw51h8qohXOMKwCog1juK',
//   //   address: '34 anthony road',
//   //   status: 'unverified',
//   //   isAdmin: false,
//   // },
//   // {
//   //   id: 8,
//   //   email: 'andela7@gmail.com',
//   //   firstName: 'Andela',
//   //   lastName: 'anthony',
//   //   password: '$2b$12$.PBmTYCHeluKXK.hF/Z14ehY1499NTAIiw51h8qohXOMKwCog1juK',
//   //   address: '34 anthony road',
//   //   status: 'unverified',
//   //   isAdmin: false,
//   // }, }
// ];
