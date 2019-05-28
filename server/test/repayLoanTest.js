import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const LOGIN = '/api/v1/auth/signin';

chai.use(chaiHttp);

describe('Admin post repayment', () => {
  it('Should create loan application successful', (done) => {
    const USER = {
      email: 'jude@quickcredit.com',
      password: 'combination',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');

        const {
          id, firstName, lastName, email, token,
        } = res.body.data;
        const applyLoan = {
          firstName,
          lastName,
          email,
          amount: 200000,
          tenor: 12,
        };
        chai
          .request(app)
          .post(`/api/v1/user/${id}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.body.should.be.a('object');
            response.should.have.status(201);
            response.body.should.have.property('data');
            done();
          });
      });
  });
  it('Should return 200 if admin can post', (done) => {
    const USER = {
      email: 'admin@quick-credit.com',
      password: 'admin',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const { id, token } = res.body.data;
        const loanid = 1;
        const amount = { amount: 55 };
        chai
          .request(app)
          .post(`/api/v1/admin/${id}/loans/${loanid}/repayment`)
          .set('authorization', token)
          .send(amount)
          .end((_error, response) => {
            response.body.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
            response.body.message.should.eql('Payment accepted');
            done();
          });
      });
  });
  it('Should return 400 if amount posted exceed balance', (done) => {
    const USER = {
      email: 'admin@quick-credit.com',
      password: 'admin',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const { id, token } = res.body.data;
        const loanid = 1;
        const amount = { amount: 200000 };
        chai
          .request(app)
          .post(`/api/v1/admin/${id}/loans/${loanid}/repayment`)
          .set('authorization', token)
          .send(amount)
          .end((_error, response) => {
            response.body.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Amount exceeds client debt!');
            done();
          });
      });
  });
  it('Should return 400 if loan application isn\'t found', (done) => {
    const USER = {
      email: 'admin@quick-credit.com',
      password: 'admin',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const { id, token } = res.body.data;
        const loanid = 2100;
        const amount = { amount: 20000 };
        chai
          .request(app)
          .post(`/api/v1/admin/${id}/loans/${loanid}/repayment`)
          .set('authorization', token)
          .send(amount)
          .end((_error, response) => {
            response.body.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Loan application not found');
            done();
          });
      });
  });
  it('Should return 201 if client completes payment', (done) => {
    const Admin = {
      email: 'admin@quick-credit.com',
      password: 'admin',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(Admin)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const { id, token } = res.body.data;

        const loanid = 2;
        const amount = { amount: 10000 };
        chai
          .request(app)
          .post(`/api/v1/admin/${id}/loans/${loanid}/repayment`)
          .set('authorization', token)
          .send(amount)
          .end((_error2, response2) => {
            response2.body.should.have.status(201);
            response2.body.should.be.a('object');
            response2.body.message.should.eql('Client has repaid loan fully');
            done();
          });
      });
  });
  it('Should return 400 if amount is omitted', (done) => {
    const USER = {
      email: 'admin@quick-credit.com',
      password: 'admin',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const { id, token } = res.body.data;
        const loanid = 1;
        chai
          .request(app)
          .post(`/api/v1/admin/${id}/loans/${loanid}/repayment`)
          .set('authorization', token)
          .end((_error, response) => {
            response.body.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Amount is required');
            done();
          });
      });
  });
  it('Should return 400 if amount is not a number', (done) => {
    const USER = {
      email: 'admin@quick-credit.com',
      password: 'admin',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const { id, token } = res.body.data;
        const loanid = 1;
        const amount = { amount: '\'110000\'' };
        chai
          .request(app)
          .post(`/api/v1/admin/${id}/loans/${loanid}/repayment`)
          .set('authorization', token)
          .send(amount)
          .end((_error, response) => {
            response.body.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Amount should be a number');
            done();
          });
      });
  });
  it('Should return 400 if amount is less than 0', (done) => {
    const USER = {
      email: 'admin@quick-credit.com',
      password: 'admin',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        const { id, token } = res.body.data;
        const loanid = 1;
        const amount = { amount: -1 };
        chai
          .request(app)
          .post(`/api/v1/admin/${id}/loans/${loanid}/repayment`)
          .set('authorization', token)
          .send(amount)
          .end((_error, response) => {
            response.body.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Amount should be more than 0');
            done();
          });
      });
  });
});
