const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const encryption = require('../../util/encryption');
const jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const salt = encryption.generateSalt();
  const hashedPass = encryption.generateHashedPassword(salt, password).trim();
  const user = {
    username: username.trim(),
    repeatPass: req.body.repeatPass.trim(),
    hashedPass,
    salt
  };


  User.create(user)
    .then(res => {
      const payload = {
        sub: res._id
      };

      const token = jwt.sign(payload, 's0m3 r@nd0m str!ng');
      const data = {
        username: res.username,
        userId: res._id
      };

      return done(null, token, data);
    })
    .catch(err => {
      console.log(err);
      if (err['message'].includes('username')) {
        return done('Username already exists!');
      }
    })

})