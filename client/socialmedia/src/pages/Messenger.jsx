import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from '../axios';
import { useSelector } from 'react-redux';

const Messenger = () => {
  const user = useSelector((state) => state.user.userData);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios
      .get('/conversations/' + user._id)
      .then((res) => setConversations(res.data));
  }, [user._id]);

  return (
    <>
      <Navigation />
      <div className="messenger">
        <div className="conversations block">
          <div className="search">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input type="text" placeholder="Поиск..." />
          </div>
          {conversations.map((el) => (
            <Link
              to={`/conversation/${el._id}`}
              className="conversationElement"
            >
              <div className="conversation__left">
                <img
                  src={
                    user._id == el.members[1]._id
                      ? el.members[0].avatarUrl
                      : el.members[1].avatarUrl
                  }
                  alt=""
                />
              </div>
              <div className="conversation__center">
                <p className="fullName">
                  {user._id == el.members[1]._id
                    ? el.members[0].fullName
                    : el.members[1].fullName}
                </p>
                <p className="lastMessage">Привет!</p>
              </div>
              <div className="conversation__right">
                <div className="createdAt">20 февраля</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Messenger;
