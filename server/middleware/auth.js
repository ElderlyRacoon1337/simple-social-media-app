import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;
    if (token && isCustomAuth) {
      const decodedData = jwt.verify(token, 'secret');
      req.userId = decodedData._id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Нет доступа!',
    });
  }
};
