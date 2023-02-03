import fs from 'fs';

export default (req, res, next) => {
  fs.mkdir(`uploads/${req.userId || 'vd9dv88dv9d9sdv'}`, (err) => {});
  next();
};
