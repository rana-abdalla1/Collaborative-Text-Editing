const mongoose = require('mongoose');
const userSchema =new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'please enter a username'],
    },
    password: {
      type: String,
      required: [true, 'please enter a password'],
    },
  });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;