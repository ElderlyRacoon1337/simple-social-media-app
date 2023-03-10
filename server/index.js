import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
// import { Server } from 'socket.io';
import http from 'http';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import conversations from './routes/conversations.js';
import messages from './routes/messages.js';
import isAuth from './middleware/auth.js';
import createFolder from './middleware/createFolder.js';

const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//   },
// });

// подключение .env файла
dotenv.config();

// добавление парсера json
app.use(express.json());

// чтобы можно было делать запросы на сервер
app.use(cors());

// загрузка фото на сервер
const storage = multer.diskStorage({
  destination: (req, __, cb) => {
    cb(null, `uploads/${req.userId || 'vd9dv88dv9d9sdv'}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.post(
  '/upload',
  isAuth,
  createFolder,
  upload.single('image'),
  (req, res) => {
    res.json({
      url: `/uploads/${req.userId}/${req.file.originalname}`,
    });
  }
);

// обработка запросов
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/conversations', conversations);
app.use('/messages', messages);

// app.get('/chat', (req, res) => {
//   res.sendFile(
//     '/Users/pavel/Documents/GitHub/simple-social-media-app/server/index.html'
//   );
// });

// io.on('connection', (socket) => {
//   console.log('fsdf');
// socket.on('chat message', (msg) => {
//   io.emit('chat message', msg);
// });
// });

// подключение к базе данных
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database error', err));

// запуск сервера
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server Running on Port: http://localhost:${process.env.PORT}`);
});
