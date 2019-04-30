import express from "express";
import expressValidate from "express-validator";
import UserControl from "../controllers/userController";
import UserValidate from "../middlewares/userValidation";
//import Authorisation from "../auth/authorisation";

const router = express.Router();

router.use(expressValidate());

const { signupUser, loginUser } = UserControl;
const { signupValidation, loginValidation } = UserValidate;
//const { verifyAdmin, verifyUser } = Authorisation;

//default route
router.get("/", (req, res) => res.status(301).redirect("/api/v1"));
router.get("/api/v1", (req, res) =>
  res.status(200).send({
    status: res.statusCode,
    message: "Welcome to Quick Credit"
  })
);

//Create user account route
router.post("/api/v1/auth/signup", signupValidation, signupUser);

//login user route index
router.post("/api/v1/auth/signin", loginValidation, loginUser);
export default router;
