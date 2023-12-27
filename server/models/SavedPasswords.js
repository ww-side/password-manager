const { Schema, model } = require('mongoose');

const SavedPasswords = new Schema({
  label: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model('SavedPasswords', SavedPasswords);