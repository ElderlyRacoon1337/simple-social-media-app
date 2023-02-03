import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../redux/slices/userSlice';

const Auth = () => {
  const signUpDefault = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  const signInDefault = {
    email: '',
    password: '',
  };

  const [isSignup, setIsSignup] = useState(true);
  const [signUpData, setSignUpData] = useState(signUpDefault);
  const [signInData, setSignInData] = useState(signInDefault);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeSignUpInput = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const onChangeSignInInput = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    isSignup ? dispatch(signUp(signUpData)) : dispatch(signIn(signInData));
    navigate('/');
  };

  return (
    <div className="signUp">
      {isSignup ? (
        <div className="window">
          <p className="title">Регистрация</p>
          <form action="">
            <input
              name="firstName"
              onChange={(e) => onChangeSignUpInput(e)}
              value={signUpData.firstName}
              type="text"
              placeholder="Имя..."
            />
            <input
              name="lastName"
              onChange={(e) => onChangeSignUpInput(e)}
              value={signUpData.lastName}
              type="text"
              placeholder="Фамилия..."
            />
            <input
              name="email"
              onChange={(e) => onChangeSignUpInput(e)}
              value={signUpData.email}
              type="email"
              placeholder="Email..."
            />
            <input
              name="password"
              onChange={(e) => onChangeSignUpInput(e)}
              value={signUpData.password}
              type="password"
              placeholder="Пароль..."
            />
            <button
              onClick={(e) => onSubmit(e)}
              type="submit"
              className="button"
            >
              Продолжить
            </button>
          </form>

          <p
            onClick={() => {
              setIsSignup(false);
              setSignUpData(signUpDefault);
            }}
            className="already"
          >
            Уже есть аккаунт?
          </p>
        </div>
      ) : (
        <div className="window">
          <p className="title">Вход</p>

          <form action="">
            <input
              name="email"
              onChange={(e) => onChangeSignInInput(e)}
              value={signInData.email}
              type="email"
              placeholder="Email..."
            />
            <input
              name="password"
              onChange={(e) => onChangeSignInInput(e)}
              value={signInData.password}
              type="password"
              placeholder="Пароль..."
            />
            <button
              onClick={(e) => onSubmit(e)}
              type="submit"
              className="button"
            >
              Продолжить
            </button>
          </form>
          <p
            onClick={() => {
              setIsSignup(true);
              setSignInData(signUpDefault);
            }}
            className="already"
          >
            Нет аккаунта?
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
