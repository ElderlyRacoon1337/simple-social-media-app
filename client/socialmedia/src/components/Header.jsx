import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMe, logout } from '../redux/slices/userSlice';
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

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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
              {/* <span>Treysi</span> */}
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
              <svg
                width="136"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#new_logo_vk_with_text__a)">
                  <g clip-path="url(#new_logo_vk_with_text__b)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M67 12.5c0 3.34-2.43 5.5-5.88 5.5-3.45 0-5.88-2.16-5.88-5.5S57.67 7 61.12 7C64.57 7 67 9.16 67 12.5Zm-9.22 0c0 2.07 1.35 3.5 3.34 3.5s3.34-1.43 3.34-3.5-1.35-3.45-3.34-3.45-3.34 1.38-3.34 3.45Zm-17.03-.21c.95-.44 1.56-1.18 1.56-2.33 0-1.73-1.58-2.96-3.87-2.96h-5.27v11h5.5c2.37 0 4.02-1.29 4.02-3.05 0-1.33-.87-2.32-1.94-2.66ZM35.6 9.01h2.83c.85 0 1.44.5 1.44 1.2s-.6 1.2-1.44 1.2h-2.83V9ZM38.67 16h-3.06V13.3h3.06c.96 0 1.59.55 1.59 1.36 0 .8-.63 1.33-1.59 1.33ZM51.84 18h3.19l-5.06-5.71L54.61 7h-2.9l-3.68 4.27h-.6V7H45v11h2.44v-4.38h.59l3.8 4.38ZM76.47 7v4.34h-4.93V7H69.1v11h2.43v-4.44h4.93V18h2.43V7h-2.43ZM86.9 18h-2.44V9.22h-3.8V7H90.7v2.22h-3.8V18Zm9.7-11c-2.14 0-4.02.89-4.57 2.8l2.24.37a2.38 2.38 0 0 1 2.2-1.25c1.33 0 2.12.9 2.22 2.33h-2.37c-3.23 0-4.84 1.42-4.84 3.45 0 2.05 1.59 3.3 3.83 3.3 1.8 0 3-.82 3.53-1.73l.5 1.73h1.8v-6.18c0-3.19-1.73-4.82-4.54-4.82Zm-.72 9.16c-1.19 0-1.95-.61-1.95-1.57 0-.84.62-1.43 2.48-1.43h2.3c0 1.8-1.14 3-2.83 3ZM113.73 18h-3.2l-3.8-4.38h-.6V18h-2.42V7h2.43v4.27h.59L110.4 7h2.9l-4.63 5.29 5.05 5.71Zm4.27 0h2.44V9.22h3.8V7H114.2v2.22h3.8V18Zm12.3-11c3.33 0 5.7 2.2 5.7 5.37 0 .3-.02.55-.04.79h-8.84c.23 1.69 1.46 2.83 3.32 2.83 1.29 0 2.3-.55 2.83-1.33l2.29.38c-.83 2.1-2.98 2.96-5.27 2.96-3.34 0-5.71-2.18-5.71-5.5s2.37-5.5 5.71-5.5Zm3.06 4.25A3.06 3.06 0 0 0 130.29 9a3 3 0 0 0-3.02 2.25h6.09Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M11.5 24h1c5.44 0 8.15 0 9.83-1.68C24 20.64 24 17.92 24 12.5v-1.02c0-5.4 0-8.12-1.67-9.8C20.65 0 17.93 0 12.5 0h-1C6.06 0 3.35 0 1.67 1.68 0 3.36 0 6.08 0 11.5v1.02c0 5.4 0 8.12 1.68 9.8C3.36 24 6.08 24 11.5 24Z"
                      fill="#07F"
                    ></path>
                    <path
                      d="M12.77 17.29c-5.47 0-8.59-3.75-8.72-9.99h2.74c.09 4.58 2.11 6.52 3.71 6.92V7.3h2.58v3.95c1.58-.17 3.24-1.97 3.8-3.95h2.58a7.62 7.62 0 0 1-3.51 4.98 7.9 7.9 0 0 1 4.11 5.01h-2.84a4.94 4.94 0 0 0-4.14-3.57v3.57h-.31Z"
                      fill="#fff"
                    ></path>
                  </g>
                </g>
                <defs>
                  <clipPath id="new_logo_vk_with_text__a">
                    <path
                      fill="#fff"
                      transform="translate(.001)"
                      d="M0 0h136v24H0z"
                    ></path>
                  </clipPath>
                  <clipPath id="new_logo_vk_with_text__b">
                    <path
                      fill="#fff"
                      transform="translate(0 -12)"
                      d="M0 0h136v48H0z"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
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
                <p onClick={handleSwitch} className="popup-element">
                  {theme == 'light' ? 'Темная тема' : 'Светлая тема'}
                </p>
                {isAuth && (
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
