require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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
    const jwtToken = jwt.sign({user_id: user.id}, process.env.JWT_BUFFER, {
      expiresIn: '48h'
    })
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 2,
    } )
    return res.status(statusCode).json({
        user
    });
  });
};
exports.registerController = (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
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
          email: email,
          username: username,
          password: hash,
          authMethods: []
        });
        await user.save();
        const jwtToken = jwt.sign({user_id: user.id}, process.env.JWT_BUFFER, {
          expiresIn: '48h'
        })
        res.cookie('token', jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 2,
        } )
        return res.status(200).json({
          user,
        });
      }
    }
  );
};

exports.authSuccess = (req, res, next) => {
    return res.status(200).json({
      user: req.user
    })
}
exports.authFailure = (req, res, next) => {
  return res.status(404).json({
    error: "authorization failed"
  })
}
exports.authController = (req, res, next) => {
  res.send("authorized");
};
