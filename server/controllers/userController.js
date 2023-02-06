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

    const token = jwt.sign({ email: user.email, _id: user._id }, 'secret', {
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
      { email: user._doc.email, _id: user._doc._id },
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
    const user = await userModel.findById(id).populate('friends');
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
    const posts = await postModel
      .find({ user: userId })
      .sort([['createdAt', -1]])
      .populate('user')
      .populate('comments.user');
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось получить статьи' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (err) {
    res.status(500).json({ message: 'Нет доступа' });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const oldUser = await userModel.findById(userId);
    const { avatarUrl, firstName, lastName, status, city, country } = req.body;
    const fullName = `${firstName} ${lastName}`;
    const oldAdditionalInfo = oldUser._doc.additionalInfo;
    const updatedData = {
      avatarUrl,
      fullName,
      additionalInfo: { ...oldAdditionalInfo, status, city, country },
    };

    const user = await userModel.findByIdAndUpdate(userId, updatedData);

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (err) {
    res.status(500).json({ message: 'Не получилось изменить профиль' });
  }
};

export const inviteToFriends = async (req, res) => {
  try {
    const myId = req.userId;
    const friendId = req.body.id;

    const myData = await userModel.findById(myId);
    const friendData = await userModel.findById(friendId);

    const index = friendData._doc.additionalInfo.invitesToMe.findIndex(
      (userId) => String(userId) === String(myId)
    );

    if (index === -1) {
      myData._doc.additionalInfo.invitesFromMe.push(friendId);
      friendData._doc.additionalInfo.invitesToMe.push(myId);
    } else {
      myData._doc.additionalInfo.invitesFromMe =
        myData._doc.additionalInfo.invitesFromMe.filter(
          (userId) => String(userId) !== String(friendId)
        );
      friendData._doc.additionalInfo.invitesToMe =
        friendData._doc.additionalInfo.invitesToMe.filter(
          (userId) => String(userId) !== String(myId)
        );
    }

    await userModel.findByIdAndUpdate(myId, myData);
    await userModel.findByIdAndUpdate(friendId, friendData);

    res.json({ success: 'true' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось добавить в друзья' });
  }
};

export const confirmFriendship = async (req, res) => {
  try {
    const myId = req.userId;
    const friendId = req.body.id;

    const myData = await userModel.findById(myId);
    const friendData = await userModel.findById(friendId);

    myData._doc.friends.push(friendId);
    friendData._doc.friends.push(myId);

    friendData._doc.additionalInfo.invitesFromMe =
      friendData._doc.additionalInfo.invitesFromMe.filter(
        (userId) => String(userId) !== String(myId)
      );
    myData._doc.additionalInfo.invitesToMe =
      myData._doc.additionalInfo.invitesToMe.filter(
        (userId) => String(userId) !== String(friendId)
      );

    await userModel.findByIdAndUpdate(myId, myData);
    await userModel.findByIdAndUpdate(friendId, friendData);

    res.json({ success: 'true' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось добавить в друзья' });
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const myId = req.userId;
    const friendId = req.body.id;

    const myData = await userModel.findById(myId);
    const friendData = await userModel.findById(friendId);

    friendData._doc.friends = friendData._doc.friends.filter(
      (userId) => String(userId) !== String(myId)
    );

    friendData._doc.additionalInfo.invitesFromMe.push(myId);
    myData._doc.additionalInfo.invitesToMe.push(friendId);

    myData._doc.friends = myData._doc.friends.filter(
      (userId) => String(userId) !== String(friendId)
    );

    await userModel.findByIdAndUpdate(myId, myData);
    await userModel.findByIdAndUpdate(friendId, friendData);

    res.json({ success: 'true' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось добавить в друзья' });
  }
};
