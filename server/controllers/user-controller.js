const User = require('mongoose').model('User');
const passport = require('passport');
const encryption = require('./../util/encryption');
const authValidation = require('./../util/authValidation');

module.exports = {
  registerPost: (req, res, next) => {
    const validationResult = authValidation.validateSignupForm(req.body);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        errors: validationResult.errors
      });
    }

    return passport.authenticate('local-register', (err, token, userData) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          success: false,
          message: err
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Registration successful!',
        token,
        user: userData
      })
    })(req, res, next)
  },

  loginPost: (req, res, next) => {
    const validationResult = authValidation.validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        errors: validationResult.errors
      });
    }

    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          success: false,
          message: err.message
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        token,
        user: userData
      });

    })(req, res, next)
  }
}