import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
const LOGIN = '/api/v1/auth/signin';

chai.use(chaiHttp);

// Testing api route
describe('Admin approves or reject loan', () => {
  it('Should return 200 if admin can approve or reject loan', (done) => {
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
        const email = 'andela4@gmail.com';
        chai
          .request(app)
          .patch(`/api/v1/admin/${id}/users/${email}/verify`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
            const USERs = {
              email: 'andela4@gmail.com',
              password: 'combination',
            };
            chai
              .request(app)
              .post(LOGIN)
              .send(USERs)
              .end((err, response4) => {
                response4.should.have.status(200);
                response4.body.should.be.a('object');
                response4.body.should.have.property('data');
                response4.body.data.should.have.property('token');
                const { id, token } = response4.body.data;
                const applyLoan = {
                  amount: 200000,
                  tenor: 12,
                };
                chai
                  .request(app)
                  .post(`/api/v1/user/${id}/loans`)
                  .set('authorization', token)
                  .send(applyLoan)
                  .end((_err3, response3) => {
                    response3.body.should.be.a('object');
                    response3.should.have.status(201);
                    response3.body.should.have.property('data');
                    const { id, token } = res.body.data;
                    const loanid = response3.body.data.id;
                    const decision = { decision: 'approved' };
                    chai
                      .request(app)
                      .patch(`/api/v1/admin/${id}/loans/${loanid}`)
                      .set('Authorization', token)
                      .send(decision)
                      .end((_error2, response2) => {
                        response2.should.have.status(200);
                        response2.body.should.be.a('object');
                        response2.body.should.have.property('data');
                      });
                    done();
                  });
              });
          });
      });
  });

  it('Should return 400 if user isn\'t verified', (done) => {
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
        const USERs = {
          email: 'andela5@gmail.com',
          password: 'combination',
        };
        chai
          .request(app)
          .post(LOGIN)
          .send(USERs)
          .end((err, response4) => {
            response4.should.have.status(200);
            response4.body.should.be.a('object');
            response4.body.should.have.property('data');
            response4.body.data.should.have.property('token');
            const { id, token } = response4.body.data;
            const applyLoan = {
              amount: 200000,
              tenor: 12,
            };
            chai
              .request(app)
              .post(`/api/v1/user/${id}/loans`)
              .set('authorization', token)
              .send(applyLoan)
              .end((_err3, response3) => {
                response3.body.should.be.a('object');
                response3.should.have.status(201);
                response3.body.should.have.property('data');

                const { id, token } = res.body.data;
                const loanid = response3.body.data.id;
                const decision = { decision: 'approved' };
                chai
                  .request(app)
                  .patch(`/api/v1/admin/${id}/loans/${loanid}`)
                  .set('Authorization', token)
                  .send(decision)
                  .end((_error2, response2) => {
                    response2.should.have.status(400);
                    response2.body.should.be.a('object');
                    response2.body.should.have.property('error');
                    response2.body.error.should.eql('User is not yet verified');
                  });
                done();
              });
          });
      });
  });

  it('Should return 400 if loan doesn\'t exist', (done) => {
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
        const loanid = 1050;
        const decision = { decision: 'approved' };
        chai
          .request(app)
          .patch(`/api/v1/admin/${id}/loans/${loanid}`)
          .set('Authorization', token)
          .send(decision)
          .end((_error2, response2) => {
            response2.should.have.status(400);
            response2.body.should.be.a('object');
            response2.body.should.have.property('error');
            response2.body.error.should.eql('This loan doesn\'t exist');
          });
        done();
      });
  });

  it('Should return 400 if Admin doesn\'t decide', (done) => {
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
        const email = 'andela6@gmail.com';
        chai
          .request(app)
          .patch(`/api/v1/admin/${id}/users/${email}/verify`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
            const USERs = {
              email: 'andela6@gmail.com',
              password: 'combination',
            };
            chai
              .request(app)
              .post(LOGIN)
              .send(USERs)
              .end((err, response4) => {
                response4.should.have.status(200);
                response4.body.should.be.a('object');
                response4.body.should.have.property('data');
                response4.body.data.should.have.property('token');
                const { id, token } = response4.body.data;
                const applyLoan = {
                  amount: 200000,
                  tenor: 12,
                };
                chai
                  .request(app)
                  .post(`/api/v1/user/${id}/loans`)
                  .set('authorization', token)
                  .send(applyLoan)
                  .end((_err3, response3) => {
                    response3.body.should.be.a('object');
                    response3.should.have.status(201);
                    response3.body.should.have.property('data');

                    const { id, token } = res.body.data;
                    const loanid = 103;
                    const decision = { decision: '' };
                    chai
                      .request(app)
                      .patch(`/api/v1/admin/${id}/loans/${loanid}`)
                      .set('Authorization', token)
                      .send(decision)
                      .end((_error2, response2) => {
                        response2.should.have.status(400);
                        response2.body.should.be.a('object');
                        response2.body.should.have.property('error');
                        response2.body.error.should.eql('Approved or rejected');
                      });
                    done();
                  });
              });
          });
      });
  });

  it('Should return 400 if Admin doesn\'t decide right', (done) => {
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
        const email = 'andela7@gmail.com';
        chai
          .request(app)
          .patch(`/api/v1/admin/${id}/users/${email}/verify`)
          .set('Authorization', token)
          .end((_error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
            const USERs = {
              email: 'andela7@gmail.com',
              password: 'combination',
            };
            chai
              .request(app)
              .post(LOGIN)
              .send(USERs)
              .end((err, response4) => {
                response4.should.have.status(200);
                response4.body.should.be.a('object');
                response4.body.should.have.property('data');
                response4.body.data.should.have.property('token');
                const { id, token } = response4.body.data;
                const applyLoan = {
                  amount: 200000,
                  tenor: 12,
                };
                chai
                  .request(app)
                  .post(`/api/v1/user/${id}/loans`)
                  .set('authorization', token)
                  .send(applyLoan)
                  .end((_err3, response3) => {
                    response3.body.should.be.a('object');
                    response3.should.have.status(201);
                    response3.body.should.have.property('data');

                    const { id, token } = res.body.data;
                    const loanid = 103;
                    const decision = { decision: 'house' };
                    chai
                      .request(app)
                      .patch(`/api/v1/admin/${id}/loans/${loanid}`)
                      .set('Authorization', token)
                      .send(decision)
                      .end((_error2, response2) => {
                        response2.should.have.status(400);
                        response2.body.should.be.a('object');
                        response2.body.should.have.property('error');
                        response2.body.error.should.eql('Either approved or rejected');
                      });
                    done();
                  });
              });
          });
      });
  });
});
