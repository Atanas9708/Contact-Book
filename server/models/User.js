const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  repeatPass: { type: String, required: true },
  hashedPass: { type: String, required: true },
  salt: { type: String, required: true }
});

userSchema.method({
  authenticate: function(password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;