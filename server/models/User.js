const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  savedPasswords: { type: Array, ref: 'SavedPasswords' },
});

module.exports = model('User', User);
