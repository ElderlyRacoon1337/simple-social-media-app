import { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import Post from '../components/Post';

const Profile = () => {
  const inputFileRef = useRef(null);

  const user = useSelector((state) => state.user.userData);
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="content">
      <Navigation />
      <div className="profile">
        <div className="profile__block userInfo">
          <img src={user.avatarUrl} alt="" className="avatar" />
          <div className="userInfo__center">
            <p className="fullName">{user.fullName}</p>
            <p className="status">Это статус кстати</p>
          </div>
          <div className="userInfo__right">
            <button className="button">Изменить профиль</button>
          </div>
        </div>
        <div className="profile__content">
          <div className="profile__content__left">
            <div className="profile__block createPost">
              <div className="createPostLeft">
                <img
                  src="https://waggingmongrel.com/wp-content/uploads/2018/10/shutterstock_265071971.jpg"
                  alt=""
                />
                <input placeholder="Что нового?..." type="text" />
              </div>
              <div className="createPostRight">
                <input type="file" hidden ref={inputFileRef} />
                <button
                  className="addFileBtn"
                  onClick={() => inputFileRef.current.click()}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </button>
                <button className="button">Добавить пост</button>
              </div>
            </div>
            <h1 className="allPosts__title">Мои посты</h1>
            <div className="allPosts">
              <Post />
              <Post />
            </div>
          </div>
        </div>
        <div className="profileContent__right"></div>
      </div>
    </div>
  );
};

export default Profile;
