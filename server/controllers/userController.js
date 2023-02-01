import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import postModel from '../models/postModel.js';

export const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const oldUser = await userModel.findOne({ email });
    if (oldUser)
      return res
        .status(400)
        .json({ message: 'Пользователь с таким email-ом уже существует' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      fullName: `${firstName} ${lastName}`,
      passwordHash: hash,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, 'secret', {
      expiresIn: '7d',
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, token });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось зарегестрироваться' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: 'Пользователя с таким email-ом не существует' });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user._doc.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { email: user._doc.email, id: user._doc._id },
      'secret',
      {
        expiresIn: '7d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, token });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось войти в аккаунт' });
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось найти пользователя' });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await postModel.find({ user: userId });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить статьи' });
  }
};
