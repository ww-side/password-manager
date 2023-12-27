const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') next();

  try {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.split(' ')[1];

    if (!authorizationHeader) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    if (!token) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { userId: decodedToken.id };
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'User not authorized' });
  }
};
