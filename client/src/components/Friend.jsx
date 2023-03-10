import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';

const Friend = ({ friend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const myData = useSelector((state) => state.user.userData);

  const handleDeleteFriend = () => {
    axios.post('user/deleteFriend', { id: friend._id });
    setIsOpen(false);
 };

  const createConversation = async () => {
    const conversation = await axios.post('conversations', {
      senderId: myData._id,
      recieverId: friend._id,
    });
    navigate(`/conversation/${conversation.data._id}`);
  };

  return (
    <div className="friendList__item">
      <div className="friendList__item__left">
        <Link to={`/user/${friend._id}`} className="img">
          <img src={friend.avatarUrl} alt="" />
        </Link>
        <div className="friendList__item__center">
          <Link to={`/user/${friend._id}`} className="fullName">
            {friend.fullName}
          </Link>
          <p className="status">{friend.additionalInfo?.status}</p>
          <p onClick={createConversation} className="sendMessage">
            Отправить сообщение
          </p>
        </div>
      </div>
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
