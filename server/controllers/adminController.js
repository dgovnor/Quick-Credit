import { userdata } from '../models/testdata';

class AdminController {
  static adminVerifyUser(req, res) {
    const { email } = req.params;
    const userData = userdata.find(user => user.email === email);

    if (userData) {
      userData.status = 'verified';

      const newUserData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        address: userData.address,
        status: userData.status,
        isAdmin: userData.isAdmin,
      };

      return res.status(200).send({
        status: 200,
        data: newUserData,
      });
    }
    return res.status(400).send({
      status: 400,
      error: "This user doesn't exist",
    });
  }
}

export default AdminController;
