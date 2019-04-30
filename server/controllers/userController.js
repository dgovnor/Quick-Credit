import user from "../models/userdb";
import authenticate from "../auth/authentication";

class UserController {
  static signupUser(req, res) {
    const { email, firstName, lastName, password, address } = req.body;
    const id = user.length + 1;
    const status = "unverified";
    const isAdmin = false;

    const token = authenticate.token({
      id,
      email,
      status,
      isAdmin
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
      isAdmin
    };

    if (user.find(user => user.email === email)) {
      return res.status(409).send({
        status: 409,
        error: "Email address already exist"
      });
    }

    user.push(data);
    return res.status(201).send({
      status: 201,
      message: "Successful",
      data
    });
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    const indexOfEmail = user.findIndex(user => user.email === email);

    if (indexOfEmail !== -1) {
      const checkPassword = authenticate.checkPassword(
        password,
        user[indexOfEmail].password
      );
      if (checkPassword) {
        return res.status(200).send({
          message: "Login Successful",
          status: 200,
          data: user[indexOfEmail]
        });
      }
    }

    return res.status(400).send({
      status: 400,
      error: "Email or password is incorrect"
    });
  }
}

export default UserController;
