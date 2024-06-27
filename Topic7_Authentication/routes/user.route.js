const bodyParser = require("body-parser");
const express = require("express");
const { UserController } = require("../controllers");
const verifyJwt = require("../middlewares/veryfyJwt");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//Test authorization
userRouter.get("/all", UserController.allAccess);
userRouter.get("/member", [verifyJwt.verifyToken], UserController.memberAccess);
userRouter.get(
  "/mod",
  [verifyJwt.verifyToken, verifyJwt.isModerator],
  UserController.modAccess
);
userRouter.get(
  "/admin",
  [verifyJwt.verifyToken, verifyJwt.isAdministrator],
  UserController.adminAccess
);

userRouter.post("/create", UserController.create);
userRouter.get("/list", UserController.find);
//to do
userRouter.get("/:id", UserController.findById);
userRouter.get("/find/:email", UserController.findByEmail);
userRouter.put("/edit/:id", UserController.update);
userRouter.delete("/delete/:id", UserController.del);

module.exports = userRouter;
