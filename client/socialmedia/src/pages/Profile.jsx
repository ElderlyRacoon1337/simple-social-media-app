import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import Post from '../components/Post';
import axios from '../axios';
import { useLocation } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import { fetchPostsByUser } from '../redux/slices/postsSlice';
import decode from 'jwt-decode';
import { fetchProfileData, setNotOwn, setOwn } from '../redux/slices/userSlice';

const Profile = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  // const [postsByUser, setPostsByUser] = useState([]);
  const dispatch = useDispatch();
  const postsByUser = useSelector((state) => state.posts.postsByUser);
  // const [isOwnPage, setIsOwnPage] = useState(false);
  let profileData = useSelector((state) => state.user.currentProfileData);
  const isOwnPage = useSelector((state) => state.user.isOwn);

  useEffect(() => {
    dispatch(fetchProfileData(location.pathname));
    // location.pathname == '/'
    //   ? axios.get(`/user`).then((res) => setUser(res.data))
    //   : axios
    //       .get(`${location.pathname}`)
    //       .then((res) => setUser(res.data))
    // .then(
    //   axios
    //     .get(`/user/${user._id}/posts`)
    //     .then((res) => setPostsByUser(res.data))
    // );

    // axios.get(`${location.pathname}`).then((res) => {
    //   setUser(res.data);
    // });

    dispatch(fetchPostsByUser(location.pathname));

    // axios.get(`/user/${user._id}/posts`).then((res) => {
    //   setPostsByUser(res.data);
    //   console.log(user);
    // });

    return () => {
      let profileData = null;
    };
  }, []);
  useEffect(() => {
    dispatch(fetchProfileData(location.pathname));
  }, [location.pathname]);

  const ownOrNot = () => {
    const token = localStorage.getItem('token');
    const decodedToken = decode(token);
    if (profileData) {
      if (decodedToken._id == profileData._id) {
        dispatch(setOwn());
        // setIsOwnPage(true);
      } else {
        dispatch(setNotOwn());
        // setIsOwnPage(false);
      }
    }
  };

  setTimeout(() => {
    ownOrNot();
  }, 10);

  return (
    <div className="content">
      <Navigation />
      {profileData ? (
        <div className="profile">
          <div className="profile__block userInfo">
            <img src={profileData.avatarUrl} alt="" className="avatar" />
            <div className="userInfo__center">
              <p className="fullName">{profileData.fullName}</p>
              {/* {user.additionalInfo.status && (
              <p className="status">{user.additionalInfo.status}</p>
            )} */}
            </div>
            <div className="userInfo__right">
              {isOwnPage ? (
                <button className="button">Изменить профиль</button>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="profile__content">
            <div className="profile__content__left">
              {isOwnPage ? <CreatePost user={profileData} /> : ''}
              <h1 className="allPosts__title">
                {isOwnPage ? 'Мои посты' : 'Посты пользователя'}
              </h1>
              <div className="allPosts">
                {Array.isArray(postsByUser)
                  ? postsByUser.map((post) => {
                      return <Post key={post._id} postData={post} />;
                    })
                  : ''}
              </div>
            </div>
          </div>
          <div className="profileContent__right"></div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
