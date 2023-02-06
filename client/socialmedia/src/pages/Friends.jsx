import { useSelector } from 'react-redux';
import Friend from '../components/Friend';

const Friends = () => {
  const myData = useSelector((state) => state.user.userData);

  return (
    <div className="block friends">
      <h3 className="title">Друзья</h3>
      <div className="friendList">
        {myData?.friends?.map((friend) => (
          <Friend friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
