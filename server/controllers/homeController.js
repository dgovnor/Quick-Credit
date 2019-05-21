import authenticate from '../auth/authentication';
import db from '../index';

const HomeController = {
  async signupUser(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const status = 'unverified';
    const isAdmin = false;
    const text = `INSERT INTO 
      users(email,firstName,lastName,
        password,address,status,isAdmin) VALUES($1,$2,$3,
          $4,$5,$6,$7) RETURNING *`;
    const values = [
      email,
      firstName,
      lastName,
      req.body.password = authenticate.makeHashPassword(password),
      address,
      status,
      isAdmin,
    ];
    try {
      await db.query(text, values);
      const responseResult = {
        email,
        firstName,
        lastName,
        address,
        status,
        isAdmin,
      };
      return res.status(201).json({
        status: 200,
        data: responseResult,
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'Email address already exist',
        });
      }
      return res.status(400).json(error);
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'Email or password is incorrect',
        });
      }
      const token = authenticate.token({
        id: rows[0].id,
        email: rows[0].email,
        password: rows[0].password,
      });
      const checkPassword = authenticate.checkPassword(
        password,
        rows[0].password,
      );
      if (checkPassword) {
        const responseResult = {
          token,
          id: rows[0].id,
          email: rows[0].email,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          address: rows[0].address,
          status: rows[0].status,
          isAdmin: rows[0].isadmin,
        };
        return res.header('x-auth-token', token)
          .status(200).json({
            message: 'Login Successful',
            status: 200,
            data: responseResult,
          });
      }
      return res.status(400).json({
        status: 400,
        error: 'Email or password is incorrect',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  },
};

export default HomeController;
