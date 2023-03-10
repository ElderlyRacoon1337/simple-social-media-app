import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Conversation from './contentPages/Conversation';
import EditProfile from './contentPages/EditProfile';
import Friends from './contentPages/Friends';
import News from './contentPages/News';
import NewsPost from './contentPages/NewsPost';
import Profile from './contentPages/Profile';
import Messenger from './contentPages/Messenger';
import { useSelector } from 'react-redux';

const Content = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <Routes>
      <Route path="/messenger" element={<Messenger />} />
      <Route path="/user/edit" element={<EditProfile />} />
      <Route path="/conversation/:id" element={<Conversation />} />
      <Route path="/" element={<Navigate to={`/user/${user._id}`} />} />
      <Route path="/user/:id" element={<Profile />} />
      <Route path="/user" element={<Navigate to={`/user/${user._id}`} />} />
      <Route path="/news" element={<News />} />
      <Route path="/news:post" element={<NewsPost />} />
      <Route path="/friends" element={<Friends />} />
    </Routes>
  );
};

export default Content;
