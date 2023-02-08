import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';

const Friend = ({ friend }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteFriend = () => {
    axios.post('user/deleteFriend', { id: friend._id });
    setIsOpen(false);
  };

  return (
    <div className="friendList__item">
      <Link to={`/user/${friend._id}`} className="friendList__item__left">
        <img src={friend.avatarUrl} alt="" />
        <div className="friendList__item__center">
          <p className="fullName">{friend.fullName}</p>
          <p className="status">{friend.additionalInfo?.status}</p>
        </div>
      </Link>
      <div className="friendList__item__right">
        <svg
          onClick={() => setIsOpen(!isOpen)}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="postEdit w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {isOpen && (
          <div className="postPopup">
            <p onClick={handleDeleteFriend}>Удалить из друзей</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
