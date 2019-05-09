import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const LOGIN = '/api/v1/auth/signin';

chai.use(chaiHttp);

// Testing getLoan route

describe('Admin can get all kinds of loan', () => {
  it('should return 200 if admin gets loan successsfully', (done) => {
    const USER = {
      email: 'admin@quickcredit.com',
      password: 'combination',
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
        chai
          .request(app)
          .get(`/api/v1/admin/${id}/loans`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
          });
        done();
      });
  });
  it('should return 200 if admin gets specific loan successsfully', (done) => {
    const USER = {
      email: 'admin@quickcredit.com',
      password: 'combination',
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
        const loanid = 578;
        chai
          .request(app)
          .get(`/api/v1/admin/${id}/loans/${loanid}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
          });
        done();
      });
  });
  it('should return 404 if no loan available', (done) => {
    const USER = {
      email: 'admin@quickcredit.com',
      password: 'combination',
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
        const loanid = 400;
        chai
          .request(app)
          .get(`/api/v1/admin/${id}/loans/${loanid}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.be.eql('Loan not found');
          });
        done();
      });
  });
  it('should return 404 if incorrect loanid', (done) => {
    const USER = {
      email: 'admin@quickcredit.com',
      password: 'combination',
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
        const loanid = '\'jfkdj\'';
        chai
          .request(app)
          .get(`/api/v1/admin/${id}/loans/${loanid}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.be.eql('Loan not found');
          });
        done();
      });
  });
  it('should return 200 if admin gets loan with status approved and repaid false', (done) => {
    const USER = {
      email: 'admin@quickcredit.com',
      password: 'combination',
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

        chai
          .request(app)
          .get(`/api/v1/admin/${id}/loans?status=approved&repaid=${false}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
          });
        done();
      });
  });
  it('should return 200 if admin gets loan with status approved and repaid true', (done) => {
    const USER = {
      email: 'admin@quickcredit.com',
      password: 'combination',
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

        chai
          .request(app)
          .get(`/api/v1/admin/${id}/loans?status=approved&repaid=${true}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
          });
        done();
      });
  });
  it('should return 400 if query keys isn\'t status and repaid', (done) => {
    const USER = {
      email: 'admin@quickcredit.com',
      password: 'combination',
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

        chai
          .request(app)
          .get(`/api/v1/admin/${id}/loans?house=approved&repaid=${true}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.be.eql('Query must be status and repaid');
          });
        done();
      });
  });
});
describe('User can get Loan repayment history', () => {
  it('should return 200 if user gets loan repayment', (done) => {
    const USER = {
      email: 'jude4@gmail.com',
      password: 'combination',
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
        const loanid = 678;
        chai
          .request(app)
          .get(`/api/v1/user/${id}/loans/${loanid}/repayments`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
          });
        done();
      });
  });
  it('should return 400 if user doesn\'t have loan repayment', (done) => {
    const USER = {
      email: 'jude4@gmail.com',
      password: 'combination',
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
        const loanid = 670;
        chai
          .request(app)
          .get(`/api/v1/user/${id}/loans/${loanid}/repayments`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.be.eql('No loan repayment history');
          });
        done();
      });
  });
  it('should return 403 if user loan email is not correct', (done) => {
    const USER = {
      email: 'jude@gmail.com',
      password: 'combination',
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
        const loanid = 678;
        chai
          .request(app)
          .get(`/api/v1/user/${id}/loans/${loanid}/repayments`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(403);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.be.eql('Unauthorized User');
          });
        done();
      });
  });
});
describe('Admin can get specific users', () => {
  it('Should return 200 if admin get\'s user successfully', (done) => {
    const USER = {
      email: 'adminjude@quickcredit.com',
      password: 'combination',
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
        const email = 'jude4@gmail.com';
        chai
          .request(app)
          .get(`/api/v1/admin/${id}/users/${email}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
          });
        done();
      });
  });
  it('Should return 400 if user is not found', (done) => {
    const USER = {
      email: 'adminjude@quickcredit.com',
      password: 'combination',
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
        const email = 'andela56@quickcredit.com';
        chai
          .request(app)
          .get(`/api/v1/admin/${id}/users/${email}`)
          .set('Authorization', token)
          .end((_error, response) => {
            console.log(response.body);
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('User not found');
          });
        done();
      });
  });


  it('Should return 400 if wrong email is entered', (done) => {
    const USER = {
      email: 'adminjude@quickcredit.com',
      password: 'combination',
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
        const email = 'andela56@quickcredit';
        chai
          .request(app)
          .get(`/api/v1/admin/${id}/users/${email}`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('invalid email');
          });
        done();
      });
  });
});
