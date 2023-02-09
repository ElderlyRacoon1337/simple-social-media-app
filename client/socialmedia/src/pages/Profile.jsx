import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import axios from '../axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import { fetchPostsByUser, setPostsLoading } from '../redux/slices/postsSlice';
import decode from 'jwt-decode';
import {
  clearProfileData,
  fetchProfileData,
  getMe,
  setNotOwn,
  setOwn,
} from '../redux/slices/userSlice';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';
import ProfileRightSkeleton from '../components/skeletons/ProfileRightSkeleton';
import PostSkeleton from '../components/skeletons/PostSkeleton';
import Navigation from '../components/Navigation';

const Profile = () => {
  const dispatch = useDispatch();
  const postsByUser = useSelector((state) => state.posts.postsByUser);
  const profileData = useSelector((state) => state.user.currentProfileData);
  const myData = useSelector((state) => state.user.userData);
  const isOwnPage = useSelector((state) => state.user.isOwn);
  const isPostsLoading = useSelector((state) => state.posts.isPostsLoading);
  const isProfileLoading = useSelector((state) => state.user.isProfileLoading);
  const navigate = useNavigate();
  let isInvited = false;
  let isInvitedMe = false;
  let isMyFriend = false;
  const params = useParams();

  const token = localStorage.getItem('token');
  const decodedToken = decode(token);
  if (profileData) {
    if (decodedToken._id == profileData._id) {
      dispatch(setOwn());
    } else {
      dispatch(setNotOwn());
    }
  }

  if (myData._id) {
    if (profileData._id) {
      if (
        profileData.additionalInfo.invitesToMe.find(
          (el) => String(el) == String(myData._id)
        )
      ) {
        isInvited = true;
      }
    }
  }

  if (myData._id) {
    if (profileData._id) {
      if (
        profileData.additionalInfo.invitesFromMe.find(
          (el) => String(el) == String(myData._id)
        )
      ) {
        isInvitedMe = true;
      }
    }
  }

  if (myData._id) {
    if (profileData._id) {
      if (
        profileData.friends.find((el) => String(el._id) == String(myData._id))
      ) {
        isMyFriend = true;
      }
    }
  }

  useEffect(() => {
    dispatch(fetchProfileData(params.id));

    window.scrollTo(0, 0);

    dispatch(fetchPostsByUser(params.id));

    return () => {
      dispatch(clearProfileData());
    };
  }, [params.id]);

  const handleInviteFriend = () => {
    axios.post('user/inviteToFriends', { id: profileData._id });
  };

  const handleAddFriend = () => {
    axios.post('user/confirmFriendship', { id: profileData._id });
  };

  const handleDeleteFriend = () => {
    axios.post('user/deleteFriend', { id: profileData._id });
  };

  const createConversation = async () => {
    const conversation = await axios.post('conversations', {
      senderId: myData._id,
      recieverId: profileData._id,
    });
    navigate(`/conversation/${conversation.data._id}`);
  };

  return (
    <>
      <Navigation />
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
                {profileData?.additionalInfo?.city && (
                  <p className="location">
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
              ) : isInvited ? (
                <div className="inFriends">
                  <button onClick={createConversation} className="button">
                    Отправить сообщение
                  </button>
                  <button onClick={handleInviteFriend} className="button">
                    Отменить заявку
                  </button>
                </div>
              ) : isInvitedMe ? (
                <div className="inFriends">
                  <button onClick={createConversation} className="button">
                    Отправить сообщение
                  </button>
                  <button onClick={handleAddFriend} className="button">
                    Принять заявку
                  </button>
                </div>
              ) : isMyFriend ? (
                <div className="inFriends">
                  <button onClick={createConversation} className="button">
                    Отправить сообщение
                  </button>
                  <button onClick={handleDeleteFriend} className="button">
                    Удалить из друзей
                  </button>
                </div>
              ) : (
                <div className="inFriends">
                  <button onClick={createConversation} className="button">
                    Отправить сообщение
                  </button>
                  <button onClick={handleInviteFriend} className="button">
                    Добавить в друзья
                  </button>
                </div>
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
          <div className="profile__content__right">
            <div className="block">
              <Link to="/friends">
                Друзья<span>{profileData?.friends?.length}</span>
              </Link>
              <div className="friendsRaw">
                {profileData?.friends?.map((friend) => (
                  <Link to={`/user/${friend._id}`} className="friend">
                    <img src={friend.avatarUrl} alt="" />
                    <p className="friendsName">
                      {friend.fullName.split(' ')[0]}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
