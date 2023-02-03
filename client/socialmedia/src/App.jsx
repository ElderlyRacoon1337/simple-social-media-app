import Header from './components/Header';
import Profile from './pages/Profile';
import './sass/app.scss';
import Navigation from './components/Navigation';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import News from './pages/News';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth';
import { useEffect } from 'react';
import { getMe } from './redux/slices/userSlice';

function App() {
  let isAuth = useSelector((state) =>
    Boolean(Object.keys(state.user.userData).length)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={isAuth ? <Profile /> : <Auth />} />
            <Route path="/user" element={<Profile />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
