import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileData } from '../redux/slices/userSlice';
import MessengerSkeleton from '../components/skeletons/MessengerSkeleton';

const Messenger = () => {
  const user = useSelector((state) => state.user.userData);
  const [conversations, setConversations] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoaing, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData(user._id));
    axios
      .get('/conversations/' + user._id)
      .then((res) => setConversations(res.data))
      .then((res) => setIsLoading(false));
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
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Поиск..."
            />
          </div>
          {!isLoaing ? (
            conversations.length ? (
              conversations
                .filter(
                  (el) =>
                    el.members[0].fullName
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    el.members[1].fullName
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
                .sort((a, b) => {
                  return (
                    Date.parse(b?.lastMessage?.createdAt) -
                    Date.parse(a?.lastMessage?.createdAt)
                  );
                })
                .map((el, i) => (
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
                      <p className="lastMessage">
                        {el?.lastMessage?.sender?._id == user._id ? (
                          <img
                            src={el?.lastMessage?.sender?.avatarUrl}
                            alt=""
                          />
                        ) : (
                          ''
                        )}
                        {el?.lastMessage?.text}
                      </p>
                    </div>
                    <div className="conversation__right">
                      <div className="createdAt">
                        {el.lastMessage &&
                          new Date(el?.lastMessage?.createdAt).toLocaleString(
                            'ru',
                            {
                              hour: 'numeric',
                              minute: 'numeric',
                            }
                          )}
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <p className="empty">Здесь пока нет сообщений</p>
            )
          ) : (
            <>
              {/* <div className="conversationElement">
                <MessengerSkeleton />
              </div>
              <div className="conversationElement">
                <MessengerSkeleton />
              </div>
              <div className="conversationElement">
                <MessengerSkeleton />
              </div>
              <div className="conversationElement">
                <MessengerSkeleton />
              </div>
              <div className="conversationElement">
                <MessengerSkeleton />
              </div>
              <div className="conversationElement">
                <MessengerSkeleton />
              </div>
              <div className="conversationElement">
                <MessengerSkeleton />
              </div>
              <div className="conversationElement">
                <MessengerSkeleton />
              </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messenger;
