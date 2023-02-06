import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';
import HeaderRightSkeleton from './skeletons/HeaderRightSkeleton';

const Header = () => {
  let isAuth = useSelector((state) =>
    Boolean(Object.keys(state.user.userData).length)
  );
  const isProfileLoading = useSelector((state) => state.user.isProfileLoading);
  // const isProfileLoading = true;

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  const handleSwitch = () => {
    setIsOpen(false);
    if (theme == 'light') {
      document.documentElement.dataset.theme = 'dark';
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <Link to={user.length ? `/user/${user._id}` : '/'}>
              <span>Treysi</span>
              {/* <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 14.4C0 7.61 0 4.22 2.1 2.1 4.23 0 7.62 0 14.4 0h1.2c6.79 0 10.18 0 12.3 2.1C30 4.23 30 7.62 30 14.4v1.2c0 6.79 0 10.18-2.1 12.3C25.77 30 22.38 30 15.6 30h-1.2c-6.79 0-10.18 0-12.3-2.1C0 25.77 0 22.38 0 15.6v-1.2Z"
                  fill="#07F"
                ></path>
                <path
                  d="M15.96 21.61c-6.84 0-10.74-4.68-10.9-12.48H8.5c.11 5.72 2.63 8.14 4.63 8.64V9.13h3.23v4.93c1.97-.21 4.05-2.46 4.75-4.94h3.22a9.53 9.53 0 0 1-4.38 6.23 9.87 9.87 0 0 1 5.13 6.26h-3.55c-.76-2.37-2.66-4.21-5.17-4.46v4.46h-.39Z"
                  fill="#fff"
                ></path>
              </svg> */}
            </Link>
          </div>
          <div className="header__right">
            {!isProfileLoading ? (
              isAuth ? (
                !isProfileLoading ? (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="header__right__userInfo"
                  >
                    <p className="header__fullName">{user.fullName}</p>
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="header__avatar"
                    />
                  </button>
                ) : (
                  ''
                  // <HeaderRightSkeleton />
                )
              ) : (
                ''
              )
            ) : (
              <HeaderRightSkeleton />
            )}

            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              href="/"
              className="settings"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 settingsSvg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button> */}
            {isOpen && (
              <div className="settings__popup">
                <div onClick={handleSwitch}>
                  <p className="popup-element">
                    {theme == 'light' ? 'Темная тема' : 'Светлая тема'}
                  </p>
                </div>
                {isAuth && (
                  <div href="/">
                    <p
                      onClick={() => {
                        dispatch(logout());
                        localStorage.setItem('token', '');
                        navigate('/');
                        setIsOpen(false);
                      }}
                      className="popup-element"
                    >
                      Выйти
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
