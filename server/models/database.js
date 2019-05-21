import '@babel/polyfill';
import authenticate from '../auth/authentication';
import db from '../index';

const queryTable = async () => {
  try {
    // Queries to drop Tables
    await db.query('DROP TABLE IF EXISTS users CASCADE;');
    await db.query('DROP TABLE IF EXISTS loans CASCADE;');
    // Create a uuid key
    // await db.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    // await db.query('SELECT gen_random_uuid()');
    // Queries to Create Tables
    await db.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL UNIQUE PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastNAme VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            address VARCHAR(200) NOT NULL,
            status VARCHAR(20) DEFAULT 'unverified',
            isAdmin BOOLEAN DEFAULT FALSE)`);
    await db.query('ALTER SEQUENCE users_id_seq RESTART WITH 100');
    await db.query(`CREATE TABLE IF NOT EXISTS loans(
            id SERIAL UNIQUE PRIMARY KEY,
            userEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
            createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(20) DEFAULT 'pending',
            repaid BOOLEAN DEFAULT FALSE,
            tenor INT NOT NULL,
            amount NUMERIC NOT NULL,
            paymentInstallment NUMERIC NOT NULL,
            balance NUMERIC NOT NULL,
            interest NUMERIC NOT NULL)`);
    await db.query(`CREATE TABLE IF NOT EXISTS repayment(
              id SERIAL UNIQUE PRIMARY KEY,
              loanId INT NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
              createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              amount NUMERIC NOT NULL)`);

    const values = ['admin', 'admin', 'admin@quick-credit.com', authenticate.makeHashPassword('admin'), '2 ikpoh, street, surulere, lagos', 'verified', 'true'];
    await db.query('INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values);
  } catch (err) {
    // eslint-disable-next-line no-console
    return err.stack;
  }
};

queryTable();
