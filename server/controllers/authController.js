require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(404).json({
        error: "Login credentials not found"
    })
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      error: "User with this email does not exist",
    });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(422).json({
        error: err,
      });
    }
    const statusCode = result === true ? 200 : 422;
    return res.sendStatus(statusCode);
  });
};
exports.registerController = (req, res, next) => {
  const { firstName, lastName, age, email, username, password } = req.body;
  bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS),
    async (err, hash) => {
      if (err) {
        return res.status(422).json({
          error: err,
        });
      } else {
        const user = new User({
          first_name: firstName,
          last_name: lastName,
          age: age,
          email: email,
          username: username,
          password: hash,
        });
        await user.save();
        return res.status(200).json({
          user,
        });
      }
    }
  );
};
exports.authController = (req, res, next) => {
  res.send("authorized");
};
