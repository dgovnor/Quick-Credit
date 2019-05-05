import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.should();
const LOGIN = '/api/v1/auth/signin';

chai.use(chaiHttp);

describe('User can login', () => {
  it('Should return 200 if user login successfully', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanthony',
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
      });
    done();
  });

  it('Should return 400 if user email is incorrect', (done) => {
    const USER = {
      email: 'andel@gmail.com',
      password: 'andelaanthony',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('Email or password is incorrect');
      });
    done();
  });

  it('Should return 400 if user password is incorrect', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanth',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('Email or password is incorrect');
      });
    done();
  });

  it('Should return 400 if user password is omitted', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: '',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('Password is required');
      });
    done();
  });

  it('Should return 400 if user email is omitted', (done) => {
    const USER = {
      email: '',
      password: 'andelaanthony',
    };
    chai
      .request(app)
      .post(LOGIN)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('Email is required');
      });
    done();
  });
});
// User applying for loan
describe('User can apply for loan', () => {
  it('Should return if id is invalid', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanthony',
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
          lastName, email, token,
        } = res.body.data;
        const applyLoan = {

          lastName,
          email,
          amount: 200000,
          tenor: 12,
        };
        chai
          .request(app)
          .post(`/api/v1/user/${'house'}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.should.have.status(403);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Unauthorized User');
            done();
          });
      });
  });

  it('Should return 401 if token is invalid', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanthony',
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
          lastName, email,
        } = res.body.data;
        const applyLoan = {

          lastName,
          email,
          amount: 200000,
          tenor: 12,
        };
        chai
          .request(app)
          .post(`/api/v1/user/${'house'}/loans`)
          .set('authorization', 'kdjfkdfjdf')
          .send(applyLoan)
          .end((_err, response) => {
            response.should.have.status(401);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Invalid or No token provided');
            done();
          });
      });
  });

  it('Should create loan application successful', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanthony',
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
          id, token,
        } = res.body.data;
        const applyLoan = {
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

  it('Should return 400 if application amount is emmitted', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanthony',
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
          tenor: 12,
        };
        chai
          .request(app)
          .post(`/api/v1/user/${id}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.body.should.be.a('object');
            response.should.have.status(400);
            response.body.should.have.property('error');
            response.body.error.should.eql('Amount is required');
            done();
          });
      });
  });

  it('Should return 400 if application tenor is emmitted', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanthony',
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

        };
        chai
          .request(app)
          .post(`/api/v1/user/${id}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.body.should.be.a('object');
            response.should.have.status(400);
            response.body.should.have.property('error');
            response.body.error.should.eql('Tenor is required');
            done();
          });
      });
  });
  // if loan application values are valid
  it('Should return 400 if application amount is not a number', (done) => {
    const USER = {
      email: 'andela3@gmail.com',
      password: 'andelaanthony',
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
          amount: '677hww',
          tenor: 12,
        };
        chai
          .request(app)
          .post(`/api/v1/user/${id}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.body.should.be.a('object');
            response.should.have.status(400);
            response.body.should.have.property('error');
            response.body.error.should.eql('Amount should be a number');
            done();
          });
      });
  });

  it('Should return 400 if application tenor is not a number', (done) => {
    const USER = {
      email: 'andela4@gmail.com',
      password: 'andelaanthony',
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
          amount: 20000,
          tenor: '\'12\'',
        };
        chai
          .request(app)
          .post(`/api/v1/user/${id}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.body.should.be.a('object');
            response.should.have.status(400);
            response.body.should.have.property('error');
            response.body.error.should.eql('Tenor should be a number');
            done();
          });
      });
  });

  // Check if tenor is more than 12 month or amount is less than 5000
  it('Should return 400 if application account is less than 5000', (done) => {
    const USER = {
      email: 'andela2@gmail.com',
      password: 'andelaanthony',
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
          amount: 1000,
          tenor: 12,
        };
        chai
          .request(app)
          .post(`/api/v1/user/${id}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.body.should.be.a('object');
            response.should.have.status(400);
            response.body.should.have.property('error');
            response.body.error.should.eql('Minimum amount is 5000');
            done();
          });
      });
  });
  it('Should return 400 if application tenor is greater than 12 and less than 1', (done) => {
    const USER = {
      email: 'andela@gmail.com',
      password: 'andelaanthony',
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
          amount: 20000,
          tenor: 13,
        };
        chai
          .request(app)
          .post(`/api/v1/user/${id}/loans`)
          .set('authorization', token)
          .send(applyLoan)
          .end((_err, response) => {
            response.body.should.be.a('object');
            response.should.have.status(400);
            response.body.should.have.property('error');
            response.body.error.should.eql('Tenor can\'t be more than 12month or less than 1month');
            done();
          });
      });
  });
});
