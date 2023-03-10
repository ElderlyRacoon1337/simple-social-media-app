import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friend from '../Friend';
import FriendsSkeleton from '../skeletons/FriendsSkeleton';
import { fetchProfileData } from '../../redux/slices/userSlice';

const Friends = () => {
  const myData = useSelector((state) => state.user.userData);
  const isLoading = useSelector(
    (state) => state.user.userLoadingStatus == 'LOADING'
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileData(myData._id));
    console.log();
  }, [myData._id]);

  return (
    <div className="friends">
      <div className="innerFriends block">
        <h3 className="title">
          Друзья <span>{myData?.friends?.length}</span>
        </h3>
        <div className="friendList">
          {!isLoading ? (
            myData ? (
              myData?.friends?.map((friend) => <Friend friend={friend} />)
            ) : (
              ''
            )
          ) : (
            <>
              <div className="friendList__item">
                <FriendsSkeleton />
              </div>
              <div className="friendList__item">
                <FriendsSkeleton />
              </div>
              <div className="friendList__item">
                <FriendsSkeleton />
              </div>
              <div className="friendList__item">
                <FriendsSkeleton />
              </div>
              <div className="friendList__item">
                <FriendsSkeleton />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
