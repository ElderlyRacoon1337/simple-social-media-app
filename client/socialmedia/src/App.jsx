import Header from './components/Header';
import Profile from './pages/Profile';
import './sass/app.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import News from './pages/News';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth';
import { useEffect } from 'react';
import { getMe } from './redux/slices/userSlice';
import Navigation from './components/Navigation';
import EditProfile from './pages/EditProfile';
import Friends from './pages/Friends';

function App() {
  const isAuth = useSelector((state) =>
    Boolean(Object.keys(state.user.userData).length)
  );

  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper theme-light">
        <Header />
        <div className="container">
          <div className="content">
            {<Navigation />}
            <Routes>
              <Route path="user/edit" element={<EditProfile />} />
              <Route
                path="/"
                element={
                  isAuth ? <Navigate to={`/user/${user._id}`} /> : <Auth />
                }
              />
              <Route path="/user/:id" element={<Profile />} />
              <Route
                path="/user"
                element={
                  isAuth ? <Navigate to={`/user/${user._id}`} /> : <Auth />
                }
              />
              <Route path="/news" element={<News />} />
              <Route path="/friends" element={<Friends />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
