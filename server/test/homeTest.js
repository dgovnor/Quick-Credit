import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { addDefaultUser } from '../models/dataStructure';

chai.should();
const SIGNUP = '/api/v1/auth/signup';
const LOGIN = '/api/v1/auth/signin';

chai.use(chaiHttp);

// Testing signup route
before((done) => {
  addDefaultUser();
  done();
});
describe('User sign up test', () => {
  describe(`POST ${SIGNUP}`, () => {
    it('Should create a new user', (done) => {
      const USER = {
        email: 'billyjude@gmail.com',
        firstName: 'Jude',
        lastName: 'Ezekiel',
        password: 'combination',
        address: '2 ikpoh street',
      };
      chai
        .request(app)
        .post(SIGNUP)
        .send(USER)
        .end((_err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });
  });
  describe(`POST ${SIGNUP}`, () => {
    it('Should return 400 if email is ommited', (done) => {
      const USER = {
        firstName: 'Jude',
        lastName: 'Ezekiel',
        password: 'combination',
        address: '2 ikpoh street',
      };
      chai
        .request(app)
        .post(SIGNUP)
        .send(USER)
        .end((_err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email is required');
          done();
        });
    });

    it('Should return 400 if Firstname is ommited', (done) => {
      const USER = {
        email: 'billyjude@gmail.com',
        lastName: 'Ezekiel',
        password: 'combination',
        address: '2 ikpoh street',
      };
      chai
        .request(app)
        .post(SIGNUP)
        .send(USER)
        .end((_err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('First name is required');
          done();
        });
    });

    it('Should return 400 if Lastname is ommited', (done) => {
      const USER = {
        email: 'billyjude@gmail.com',
        firstName: 'Jude',
        password: 'combination',
        address: '2 ikpoh street',
      };
      chai
        .request(app)
        .post(SIGNUP)
        .send(USER)
        .end((_err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('last name is required');
          done();
        });
    });
  });
});

describe(`POST ${SIGNUP}`, () => {
  it('Should return 400 if Password is ommited', (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'Jude',
      lastName: 'Ezekiel',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Password is required');
        done();
      });
  });

  it('Should return 400 if address is ommited', (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'Jude',
      lastName: 'Ezekiel',
      password: 'combination',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Address is required');
        done();
      });
  });

  it('Should return 400 if Email address is invalid', (done) => {
    const USER = {
      email: 'billyjude@gmail',
      firstName: 'jude',
      lastName: 'Ezekiel',
      password: 'combination',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Invalid Email address');
        done();
      });
  });
  it('Should return 400 if First name is not an alphabet', (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: '6466',
      lastName: 'Ezekiel',
      password: 'combination',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Name should only contain alphabets');
        done();
      });
  });
  it('Should return 400 if Last name is not an alphabet', (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'jude',
      lastName: '556',
      password: 'combination',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Name should only contain alphabets');
        done();
      });
  });
  it('Should return 400 if Address is not invalid', (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'jude',
      lastName: 'Ezekiel',
      password: 'combination',
      address: '2 ikpoh st$^^&',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Invalid Address entered');
        done();
      });
  });
});
describe(`POST ${SIGNUP}`, () => {
  it('Should return 409 if Email already exist', (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'jude',
      lastName: 'Ezekiel',
      password: 'combination',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        // console.log(res.body);
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql('Email address already exist');
        done();
      });
  });

  it("Should return 400 if First name doesn't meet minimum/maximum lenght", (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'ju',
      lastName: 'Ezekiel',
      password: 'combination',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'Name should be between 3 to 15 character long',
        );
        done();
      });
  });

  it("Should return 400 if last name doesn't meet minimum/maximum lenght", (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'jude',
      lastName: 'Ez',
      password: 'combination',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'Name should be between 3 to 15 character long',
        );
        done();
      });
  });

  it("Should return 400 if Password doesn't meet minimum/maximum lenght", (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'jude',
      lastName: 'Ezekiel',
      password: 'combin',
      address: '2 ikpoh street',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'Password should be between 8 to 15 character long',
        );
        done();
      });
  });
  it("Should return 400 if Address doesn't meet minimum/maximum lenght", (done) => {
    const USER = {
      email: 'billyjude@gmail.com',
      firstName: 'jude',
      lastName: 'Ezekiel',
      password: 'combination',
      address: 'ikpoh',
    };
    chai
      .request(app)
      .post(SIGNUP)
      .send(USER)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.eql(
          'Address should be between 10 to 100 character long',
        );
        done();
      });
  });
});

describe('User signin test', () => {
  describe(`POST${LOGIN}`, () => {
    it('Should return 200 if user signin successfully', (done) => {
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
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('isAdmin');
          done();
        });
    });

    it('Should return 400 if user signin was unsuccessful', (done) => {
      const USER = {
        email: 'biljude@gmail.com',
        password: 'combination',
      };
      chai
        .request(app)
        .post(LOGIN)
        .send(USER)
        .end((_err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email or password is incorrect');
          done();
        });
    });

    it('Should return 400 if email is not ommited', (done) => {
      const USER = {
        email: '',
        password: 'combination',
      };
      chai
        .request(app)
        .post(LOGIN)
        .send(USER)
        .end((_err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Email is required');
          done();
        });
    });

    it('Should return 400 if password is ommited', (done) => {
      const USER = {
        email: 'billyjude@gmail.com',
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
          res.body.error.should.be.eql('Password is required');
          done();
        });
    });
  });
});
