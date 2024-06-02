const express = require("express");
const { body } = require("express-validator");
const {
  loginController,
  registerController,
  authController,
  authSuccess,
  authFailure,
} = require("../controllers/authController");
const User = require("../models/User");
const authRouter = express.Router();
const passingValidationErrors = require("../controllers/passingValidationErrors");
const passport = require("passport");

authRouter.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Email should have @ character and a domain"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field cannot be empty"),
  ],
  passingValidationErrors,
  loginController
);

authRouter.post(
  "/register",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name cannot be empty")
      .isLength({
        min: 3,
        max: 30,
      })
      .withMessage("First name should be from 3 to 30 characters long"),
    body("lastName")
      .trim()
      .notEmpty()
      .isLength()
      .withMessage("Last Name cannot be empty")
      .isLength({
        min: 3,
        max: 30,
      })
      .withMessage("Last name should be from 3 to 30 characters long"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Email should have @ character and a domain")
      .custom(async (email) => {
        const userWithTakenEmail = await User.findOne({ email: email });
        if (userWithTakenEmail) {
          throw Error("User with this email already exists");
        }
      }),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username cannot be empty")
      .isLength({
        min: 3,
        max: 50,
      })
      .withMessage("Username should be from 3 to 50 characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field cannot be empty")
      .isLength({
        min: 8,
        max: 40,
      })
      .withMessage("Password should contain between 8 and 40 characters"),
  ],
  passingValidationErrors,
  registerController
);
authRouter.post("/verify_user", authController);
authRouter.get(
  "/verify_user/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
authRouter.get(
  "/verify_user/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
  })
);
authRouter.get("/success", authSuccess);
authRouter.get("/failure", authFailure);
module.exports = authRouter;
