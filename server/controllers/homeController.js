import { users } from '../models/dataStructure';
import { userdata } from '../models/testdata';
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

    users.push(data);
    return res.status(201).send({
      status: 201,
      message: 'Successful',
      data,
    });
  }

  static loginUser(req, res) {
    const { id, email, password } = req.body;
    const indexOfEmail = userdata.findIndex(user => user.email === email);
    const token = authenticate.token({
      id,
      email,
      password,
    });

    if (indexOfEmail !== -1) {
      const checkPassword = authenticate.checkPassword(
        password,
        userdata[indexOfEmail].password,
      );
      if (checkPassword) {
        const data = userdata[indexOfEmail];
        data.token = token;
        return res.status(200).send({
          message: 'Login Successful',
          status: 200,
          data,
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
