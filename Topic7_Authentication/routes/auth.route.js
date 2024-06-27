const bodyParser = require("body-parser");
const express = require("express");
const { AuthController } = require("../controllers");
const verifySignUp = require("../middlewares/verifySignUp");

const authRouter = express.Router();
authRouter.use(bodyParser.json());
// sign up route
authRouter.post(
  "/signup",
  [verifySignUp.checkExistUser, verifySignUp.checkExistRoles],
  AuthController.signUp
);

authRouter.post("/signin", AuthController.signIn);

module.exports = authRouter;
