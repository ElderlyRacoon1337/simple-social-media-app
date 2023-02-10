import Header from './components/Header';
import Profile from './pages/Profile';
import './sass/app.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import News from './pages/News';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth';
import { useEffect } from 'react';
import { getMe } from './redux/slices/userSlice';
import EditProfile from './pages/EditProfile';
import Friends from './pages/Friends';
import Messenger from './pages/Messenger';
import Conversation from './pages/Conversation';
import Footer from './components/Footer';
import NewsPost from './pages/NewsPost';

function App() {
  const isAuth = useSelector((state) =>
    Boolean(Object.keys(state.user.userData).length)
  );

  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper theme-light">
        <Header />
        <div className="container">
          <div className="content">
            <Routes>
              <Route
                path="/messenger"
                element={isAuth ? <Messenger /> : <Auth />}
              />
              <Route
                path="/user/edit"
                element={isAuth ? <EditProfile /> : <Auth />}
              />
              <Route
                path="/conversation/:id"
                element={isAuth ? <Conversation /> : <Auth />}
              />
              <Route
                path="/"
                element={
                  !isAuth ? <Auth /> : <Navigate to={`/user/${user._id}`} />
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
              <Route path="/news:post" element={<NewsPost />} />
              <Route path="/friends" element={<Friends />} />
            </Routes>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
