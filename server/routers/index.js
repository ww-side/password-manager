const Router = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
