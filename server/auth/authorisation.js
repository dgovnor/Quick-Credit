import Authentic from "./authentication";

const { verifyToken } = Authentic;

class Authorisation {
  /**
   * @description This verifies the admin
   * @param {object} req The resquest Object
   * @param {object} res The Response Object
   * @param {fuction} next
   * @returns {object}Json api response
   */
  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorisation.split(" ")[1];
      const decoded = verifyToken(token);
      req.user = decoded.payload;
      if (req.user.email !== "admin@quick-credit.com") {
        return res.status(403).send({
          status: 403,
          error: "Only An admin can access this route"
        });
      }
      return next();
    } catch (err) {
      return res.status(401).send({
        status: 401,
        error: "NO or Invalid Token provided"
      });
    }
  }
  /**
   *@description this verifies the user
   * @param {object} req The resquest Object
   * @param {object} res The Response Object
   * @param {function} next
   * @returns {object} Json APi response
   */
  verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = verifyToken(token);
      req.user = decoded.payload;

      if (!req.user.id) {
        return res.status(403).send({
          status: 403,
          error: "Only Authenticated User can access this route"
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: "Invalid or No token provided"
      });
    }
  }
}
export default Authorisation;
