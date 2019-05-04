import Authentic from './authentication';
import { users } from '../models/dataStructure';

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
    const user = users.filter(element => element.id === parseInt(req.params.id, 10));
    if (user.length === 0 || req.payload.email !== user[0].email
      || user[0].id !== req.payload.id || !user[0].isAdmin) {
      return res.status(403).send({
        status: 403,
        error: 'Only An admin can access this route',
      });
    }
    return next();
  }

  /**
   *@description this verifies the user
   * @param {object} req The resquest Object
   * @param {object} res The Response Object
   * @param {function} next
   * @returns {object} Json APi response
   */

  static verifyUser(req, res, next) {
    const user = users.filter(element => element.id === parseInt(req.params.id, 10));
    if (user.length === 0 || req.payload.email !== user[0].email
      || user[0].id !== req.payload.id || user[0].isAdmin) {
      return res.status(403).send({
        status: 403,
        error: 'Unauthorized User',
      });
    }
    return next();
  }

  static validateToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
      const decoded = verifyToken(token);
      req.payload = decoded.payload;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid or No token provided',
      });
    }
  }
}

export default Authorisation;
