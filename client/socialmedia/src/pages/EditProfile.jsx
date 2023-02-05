import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { fetchPostsByUser } from '../redux/slices/postsSlice';
import { getMe } from '../redux/slices/userSlice';

const EditProfile = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [status, setStatus] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [avatarUrl, setAvatarUrl] = useState();

  const inputFileRef = useRef(null);
  const doneRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setAvatarUrl(`http://localhost:5000${data.url}`);
    } catch (error) {
      console.log('Ошибка при загрузке файла');
    }
  };

  useEffect(() => {
    if (userData.fullName) {
      setFirstName(userData.fullName.split(' ')[0]);
      setLastName(userData.fullName.split(' ')[1]);
      setStatus(userData.additionalInfo.status);
      setCity(userData.additionalInfo.city);
      setCountry(userData.additionalInfo.country);
      setAvatarUrl(userData.avatarUrl);
    }
  }, [userData.fullname, userData]);

  const handleSubmit = () => {
    const body = {
      firstName,
      lastName,
      status,
      status,
      city,
      country,
      avatarUrl: avatarUrl
        ? avatarUrl
        : 'http://localhost:5000/uploads/avatarPlaceholder.jpeg',
    };

    axios.patch(`/user/${userData._id}`, body);

    doneRef.current.className = '';

    // navigate('/');
  };

  return (
    <div className="editProfile">
      <div className="editProfile__top">
        <Link to="/" className="button">
          Назад
        </Link>
      </div>
      <div className="editProfile__content">
        <div className="profileElement">
          <div className="profileElement__left">
            <img
              onClick={() => inputFileRef.current.click()}
              src={
                avatarUrl
                  ? avatarUrl
                  : 'http://localhost:5000/uploads/avatarPlaceholder.jpeg'
              }
              alt=""
            />
            <svg
              onClick={() => inputFileRef.current.click()}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 svgAddPhoto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>

            <svg
              onClick={() => setAvatarUrl('')}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 svgCart"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            <input
              ref={inputFileRef}
              onChange={handleChangeFile}
              type="file"
              className="hidden"
            />
          </div>
          <div className="profileElement__right">
            <div className="profileElement__right-item">
              <p>Имя:</p>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
            </div>
            <div className="profileElement__right-item">
              <p>Фамилия:</p>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="profileElement">
          <p>Cтатус:</p>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            type="text"
          />
        </div>
        <div className="profileElement">
          <p>Город:</p>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
          />
        </div>
        <div className="profileElement">
          <p>Страна:</p>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="editProfile__bottom">
        <button onClick={handleSubmit} className="button">
          Сохранить изменения
        </button>
        <svg
          ref={doneRef}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default EditProfile;
