import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const LOGIN = '/api/v1/auth/signin';

chai.use(chaiHttp);

// Testing signup route
describe('Admin verify user', () => {
  it('Should return 200 if admin is verified', (done) => {
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
        const email = 'andela@gmail.com';
        chai
          .request(app)
          .patch(`/api/v1/admin/${id}/users/${email}/verify`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
          });
        done();
      });
  });

  it('Should return 400 if user is not an admin', (done) => {
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
        const { id, token } = res.body.data;
        const email = 'andela@gmail.com';
        chai
          .request(app)
          .patch(`/api/v1/admin/${id}/users/${email}/verify`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(403);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('Only An admin can access this route');
          });
        done();
      });
  });
  it('Should return 400 if email of user is incorrect', (done) => {
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
        const email = 'ande@gmail.com';
        chai
          .request(app)
          .patch(`/api/v1/admin/${id}/users/${email}/verify`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            response.body.error.should.eql('This user doesn\'t exist');
          });
        done();
      });
  });
});
