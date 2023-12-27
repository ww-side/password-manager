const Router = require('express');
const { check } = require('express-validator');
const router = Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/savePassword',
  authMiddleware,
  [
    check('label', 'Label cannot be empty').notEmpty(),
    check('password', 'Password cannot be empty').notEmpty(),
  ],
  userController.savePassword
);
router.get(
  '/getAllSavedPasswords',
  authMiddleware,
  userController.getAllSavedPasswords
);
router.get('/isTokenValid', authMiddleware, userController.isTokenValid);
router.delete(
  '/deletePassword/:label',
  authMiddleware,
  userController.deletePassword
);

module.exports = router;
