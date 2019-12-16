const jwt = require('jsonwebtoken'); // import jwt package

// athorization function for all authentication
const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    next({ message: 'Access Denied. Please Login....', statusCode: 401 });
    return;
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    next({ message: 'Invalid Token', statusCode: 400 });
  }
};

module.exports = { auth };
