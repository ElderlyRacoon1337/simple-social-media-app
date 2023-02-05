import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import axios from '../axios';
import { Link, useLocation } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import { fetchPostsByUser, setPostsLoading } from '../redux/slices/postsSlice';
import decode from 'jwt-decode';
import {
  clearProfileData,
  fetchProfileData,
  getMe,
  setNotOwn,
  setOwn,
  setProfileLoading,
} from '../redux/slices/userSlice';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';
import ProfileRightSkeleton from '../components/skeletons/ProfileRightSkeleton';
import PostSkeleton from '../components/skeletons/PostSkeleton';

const Profile = () => {
  // const [user, setUser] = useState({});
  const location = useLocation();
  // const [postsByUser, setPostsByUser] = useState([]);
  const dispatch = useDispatch();
  const postsByUser = useSelector((state) => state.posts.postsByUser);
  let profileData = useSelector((state) => state.user.currentProfileData);
  const isOwnPage = useSelector((state) => state.user.isOwn);
  const isPostsLoading = useSelector((state) => state.posts.isPostsLoading);
  const isProfileLoading = useSelector((state) => state.user.isProfileLoading);
  // const isProfileLoading = true;

  const token = localStorage.getItem('token');
  const decodedToken = decode(token);
  if (profileData) {
    if (decodedToken._id == profileData._id) {
      dispatch(setOwn());
    } else {
      dispatch(setNotOwn());
    }
  }

  useEffect(() => {
    // dispatch(setProfileLoading(true));

    dispatch(fetchProfileData(location.pathname));

    window.scrollTo(0, 0);

    dispatch(getMe());

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
  }, [location.pathname]);

  return (
    <div className="profile">
      <div className="profile__block userInfo">
        {!isProfileLoading ? (
          <>
            <img src={profileData?.avatarUrl} alt="" className="avatar" />
            <div className="userInfo__center">
              <p className="fullName">{profileData?.fullName}</p>
              {profileData?.additionalInfo?.status && (
                <p className="status">{profileData?.additionalInfo?.status}</p>
              )}
              {profileData?.additionalInfo?.city && (
                <p className="location">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {`${profileData?.additionalInfo?.city}, ${profileData?.additionalInfo?.country}`}
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
              <Link to={'/user/edit'} className="button">
                Изменить профиль
              </Link>
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
  );
};

export default Profile;
