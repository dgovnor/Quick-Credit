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
        const loanid = 100;
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
});
