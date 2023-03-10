import Header from './components/Header';
import Profile from './components/contentPages/Profile';
import './sass/app.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import News from './components/contentPages/News';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth';
import { useEffect } from 'react';
import { getMe } from './redux/slices/userSlice';
import Main from './pages/Main';
import CenterLogo from './pages/CenterLogo';

function App() {
  const isAuth = useSelector((state) =>
    Boolean(Object.keys(state.user.userData).length)
  );
  const loadingStatus = useSelector((state) => state.user.userLoadingStatus);
  const isLoadedUserData =
    loadingStatus == 'ERROR' || loadingStatus == 'LOADED';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper theme-light">
        <Header />
        <Routes>
          <Route
            path="/*"
            element={
              isLoadedUserData ? !isAuth ? <Auth /> : <Main /> : <CenterLogo />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
