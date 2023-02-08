import { useSelector } from 'react-redux';
import Friend from '../components/Friend';
import Navigation from '../components/Navigation';

const Friends = () => {
  const myData = useSelector((state) => state.user.userData);

  return (
    <>
      <Navigation />
      <div className="friends">
        <div className="innerFriends block">
          <h3 className="title">Друзья</h3>
          <div className="friendList">
            {myData?.friends?.map((friend) => (
              <Friend friend={friend} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
