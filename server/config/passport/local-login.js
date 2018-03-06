const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const inputUser = {
    username: username.trim(),
    password: password.trim()
  };

  User.findOne({ username: inputUser.username })
    .then(user => {
      let error = {};

      if (!user) {
        error['message'] = 'Incorrect username!';
        return done(error);
      }

      if (!user.authenticate(inputUser.password)) {
        error['message'] = 'Incorrect password!';
        return done(error);
      }

      const payload = {
        sub: user._id
      };

      const token = jwt.sign(payload, 's0m3, r@nd0m str!ng');
      const data = {
        username: user.username,
        userId: user._id
      };
      return done(null, token, data);
    })
    .catch(err => {
      if (err) {
        console.log(err);
        return;
      }
    })
});
