import bcrypt from "bcrypt";
import jsonwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//create a class authenticator
class Authenticator {
  //TODO check if the payload can load without {}
  /**
   * @description Creates the token
   * @param {object} payload - credential of user
   * @returns {string} access token
   */
  static token(payload) {
    return jsonwt.sign({ payload }, process.env.SECRET, { expiresIn: 3600000 });
  }

  //TODO check if you can use decoded as a function in verifyToken
  /**
   * @description verifies the token
   * @param {string} token the token
   * @returns {object} payload- the decoded access token
   */
  static verifyToken(token) {
    return jsonwt.verify(token, process.env.SECRET);
  }
  /**
   * @description The user password is hashed
   * @param {string} password - The password that will be hashed
   * @returns {string}  A hashed password
   */
  static makeHashPassword(password) {
    return bcrypt.hashSync(password, 12);
  }
  /**
   * @description Checks if the user password is valid by comparing the two param
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {boolen} indicates true or false
   */
  static checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
export default Authenticator;
