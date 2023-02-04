import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import axios from '../axios';
import { useLocation } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import { fetchPostsByUser, setPostsLoading } from '../redux/slices/postsSlice';
import decode from 'jwt-decode';
import {
  clearProfileData,
  fetchProfileData,
  setNotOwn,
  setOwn,
} from '../redux/slices/userSlice';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';
import ProfileRightSkeleton from '../components/skeletons/ProfileRightSkeleton';
import PostSkeleton from '../components/skeletons/PostSkeleton';

const Profile = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  // const [postsByUser, setPostsByUser] = useState([]);
  const dispatch = useDispatch();
  const postsByUser = useSelector((state) => state.posts.postsByUser);
  // const [isOwnPage, setIsOwnPage] = useState(false);
  let profileData = useSelector((state) => state.user.currentProfileData);
  const isOwnPage = useSelector((state) => state.user.isOwn);
  const isPostsLoading = useSelector((state) => state.posts.isPostsLoading);
  const isProfileLoading = useSelector((state) => state.user.isProfileLoading);

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
      profileData = null;
      dispatch(clearProfileData());
    };
  }, []);
  useEffect(() => {
    profileData = null;
    dispatch(clearProfileData());
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
  }, 0);

  return (
    <>
      {profileData ? (
        <div className="profile">
          <div className="profile__block userInfo">
            {!isProfileLoading ? (
              <>
                <img src={profileData?.avatarUrl} alt="" className="avatar" />
                <div className="userInfo__center">
                  <p className="fullName">{profileData?.fullName}</p>
                  {profileData?.additionalInfo?.status && (
                    <p className="status">
                      {profileData?.additionalInfo?.status}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <ProfileSkeleton />
            )}

            <div className="userInfo__right">
              {!isProfileLoading ? (
                isOwnPage ? (
                  <button className="button">Изменить профиль</button>
                ) : (
                  ''
                )
              ) : (
                <ProfileRightSkeleton />
              )}
            </div>
          </div>
          <div className="profile__content">
            <div className="profile__content__left">
              {!isProfileLoading ? (
                isOwnPage ? (
                  <CreatePost user={profileData} />
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              <h1 className="allPosts__title">
                {/* {isOwnPage ? 'Мои посты' : 'Посты пользователя'} */}
              </h1>
              <div className="allPosts">
                {!isPostsLoading ? (
                  Array.isArray(postsByUser) ? (
                    postsByUser.map((post) => {
                      return (
                        <Post
                          key={post._id}
                          postData={post}
                          isOwnPage={isOwnPage}
                        />
                      );
                    })
                  ) : (
                    ''
                  )
                ) : (
                  <>
                    <div className="post block skeletPost">
                      <PostSkeleton />
                    </div>
                    <div className="post block skeletPost">
                      <PostSkeleton />
                    </div>
                    <div className="post block skeletPost">
                      <PostSkeleton />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="profileContent__right"></div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Profile;
