import chai from 'chai';
import chaiHttp from 'chai-http';
import { userdata, removeData } from './models/testdata';
import app from './app';

chai.should();
chai.use(chaiHttp);

before(async () => {
  console.log('before hook');
  await userdata();
});

after(async () => {
  console.log('after hook');
  await removeData();
  // await removeData();
  // console.log(done());
});

describe('hello', () => {
  it('should say no', (done) => {
    chai
      .request(app)
      .get('/:id/loans/:loanid')
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });
});
