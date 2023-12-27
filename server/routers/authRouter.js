const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post(
  '/registration',
  [
    check('username', 'Username should be not empty').notEmpty(),
    check(
      'password',
      'Password should be no less than 4 characters and no more than 30 characters'
    ).isLength({ min: 4, max: 30 }),
  ],
  authController.registration
);
router.post('/login', authController.login);

module.exports = router;
