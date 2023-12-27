const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');
const User = require('../models/User');
const { validationResult } = require('express-validator');

function getUserId(authorizationHeader) {
  const token = authorizationHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return decodedToken.id;
}

function decryptPassword(encryptedPassword, secretKey) {
  const bytes = cryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(cryptoJS.enc.Utf8);
}

class UserController {
  async isTokenValid(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.SECRET_KEY);
      res.status(200).json({ message: 'Token is valid' });
    } catch (e) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  async savePassword(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { label, password } = req.body;

      const isLabelUnique = await User.findOne({
        _id: getUserId(req.headers.authorization),
        'savedPasswords.label': label,
      });

      if (isLabelUnique) {
        return res.status(400).json({ message: 'Label must be unique' });
      }

      const candidate = await User.findOne({
        _id: getUserId(req.headers.authorization),
      });

      if (!candidate) {
        return res.status(404).json({ message: 'User not found' });
      }

      const hashPassword = cryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY_CRYPTO
      ).toString();

      await User.findByIdAndUpdate(candidate, {
        $push: { savedPasswords: { label, password: hashPassword } },
      });

      return res.json({ message: 'Password successfully added' });
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }

  async getAllSavedPasswords(req, res) {
    try {
      const candidate = await User.findOne({
        _id: getUserId(req.headers.authorization),
      });

      if (!candidate) {
        return res.status(404).json({ message: 'User not found' });
      }

      const savedPasswords = candidate.savedPasswords || [];

      const decryptedPasswords = await Promise.all(
        savedPasswords.map(async savedPassword => {
          const decryptedPassword = await decryptPassword(
            savedPassword.password,
            process.env.SECRET_KEY_CRYPTO
          );

          return {
            label: savedPassword.label,
            password: decryptedPassword,
          };
        })
      );

      return res.json({ savedPasswords: decryptedPasswords });
    } catch (e) {
      res.status(400).json({ message: 'Get all saved passwords error' });
    }
  }

  async deletePassword(req, res) {
    try {
      const userId = getUserId(req.headers.authorization);
      const { label } = req.params;

      const result = await User.findOneAndUpdate(
        {
          _id: userId,
          'savedPasswords.label': label,
        },
        {
          $pull: {
            savedPasswords: { label },
          },
        },
        { new: true }
      );

      if (!result) {
        return res.status(404).json({ message: 'Password not found' });
      }

      return res.json({ message: 'Password successfully deleted' });
    } catch (e) {
      res.status(400).json({ message: 'Delete password error' });
    }
  }
}

module.exports = new UserController();
