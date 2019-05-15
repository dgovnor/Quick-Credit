import { users } from '../models/dataStructure';
import authenticate from '../auth/authentication';


class HomeController {
  static signupUser(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const id = users.length + 1;
    const status = 'unverified';
    const isAdmin = false;

    const token = authenticate.token({
      id,
      email,
      status,
      isAdmin,
    });

    const data = {
      token,
      id,
      email,
      firstName,
      lastName,
      password: authenticate.makeHashPassword(password),
      address,
      status,
      isAdmin,
    };

    if (users.find(user => user.email === email)) {
      return res.status(409).send({
        status: 409,
        error: 'Email address already exist',
      });
    }
    const responseResult = {
      token,
      id,
      email,
      firstName,
      lastName,
      address,
      status,
      isAdmin,
    };
    users.push(data);
    return res.status(201).send({
      status: 201,
      message: 'Successful',
      data: responseResult,
    });
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    const indexOfEmail = users.findIndex(user => user.email === email);


    if (indexOfEmail !== -1) {
      const { id } = users[indexOfEmail];
      const token = authenticate.token({
        id,
        email,
        password,
      });
      const checkPassword = authenticate.checkPassword(
        password,
        users[indexOfEmail].password,
      );
      if (checkPassword) {
        const data = users[indexOfEmail];
        data.token = token;
        const responseResult = {
          token: data.token,
          id: data.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          status: data.status,
          isAdmin: data.isAdmin,
        };
        return res.status(200).send({
          message: 'Login Successful',
          status: 200,
          data: responseResult,
        });
      }
    }

    return res.status(400).send({
      status: 400,
      error: 'Email or password is incorrect',
    });
  }
}

export default HomeController;
