import axios from '../axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { io } from 'socket.io-client';
import ConversatioinHeaderSkeleton from '../components/skeletons/ConversatioinHeaderSkeleton';
import ConversatioinSkeleton from '../components/skeletons/ConversatioinSkeleton';
import { fetchProfileData } from '../redux/slices/userSlice';

const Conversation = () => {
  const user = useSelector((state) => state.user.userData);
  const [messages, setMessages] = useState([]);
  const conversationId = useParams();
  const [conversations, setConversations] = useState([]);
  const [value, setValue] = useState('');
  const areaRef = useRef(null);
  const input = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState('');
  const currentConversation = conversations.find(
    (el) => el._id == conversationId.id
  );
  const [isLoading, setIsLoading] = useState(true);
  const socket = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData(user._id));
  }, [user._id]);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      // setArrivalMessage({
      //   sender: data.senderId,
      //   // sender: data.senderId == user._id ? (user._id:{...user}) : (bebrik._id:{...bebrik}),
      //   // sender: { ...user._id },
      //   text: data.text,
      //   createdAt: Date.now(),
      // });
      axios
        .get('/messages/' + conversationId.id)
        .then((res) => setMessages(res.data))
        .then((res) => setIsLoading(false));
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      // currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  useEffect(() => {
    if (!user._id) return;
    if (!socket) return;
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {});
  }, [socket, user._id]);

  useEffect(() => {
    areaRef.current.scrollTop = areaRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    user._id &&
      axios
        .get('/conversations/' + user._id)
        .then((res) => setConversations(res.data));
  }, [user._id]);

  useEffect(() => {
    axios
      .get('/messages/' + conversationId.id)
      .then((res) => setMessages(res.data))
      .then((res) => setIsLoading(false));

    input.current.focus();
  }, []);

  const sendHandler = async () => {
    await axios.post('messages', {
      conversationId: conversationId.id,
      sender: user._id,
      text: value,
    });
    await axios
      .get('/messages/' + conversationId.id)
      .then((res) => setMessages(res.data))
      .then((res) => setIsLoading(false));
    setValue('');

    const receiverId = currentConversation.members.find(
      (member) => member._id !== user._id
    );

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId: receiverId._id,
      text: value,
    });
  };

  return (
    <>
      <Navigation />
      <div className="conversation">
        <div className="conversationLeft block">
          <div className="conversation__top">
            {!isLoading ? (
              <>
                <Link to="/messenger" className="back">
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  <p>Назад</p>
                </Link>
                <p className="fullName">
                  {user._id == currentConversation?.members[1]._id
                    ? currentConversation?.members[0].fullName
                    : currentConversation?.members[1].fullName}
                </p>
                <img
                  src={
                    user._id == currentConversation?.members[1]._id
                      ? currentConversation?.members[0].avatarUrl
                      : currentConversation?.members[1].avatarUrl
                  }
                  alt=""
                />
              </>
            ) : (
              <ConversatioinHeaderSkeleton />
            )}
          </div>

          <div ref={areaRef} className="conversation__content">
            {!isLoading ? (
              messages.length ? (
                messages?.map((message, i) => {
                  if (message.sender._id !== messages[i - 1]?.sender?._id) {
                    return (
                      <div className="messageToMe">
                        <Link to={`/user/${message.sender._id}`} className="">
                          <img src={message.sender.avatarUrl} alt="" />
                        </Link>
                        <div className="messageText">
                          <div className="flex">
                            <Link
                              to={`/user/${message.sender._id}`}
                              className="creator"
                            >
                              {message.sender.fullName}
                            </Link>
                            <p className="date">
                              {new Date(message.createdAt).toLocaleString(
                                'ru',
                                {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                }
                              )}
                            </p>
                          </div>
                          <p>{message.text}</p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="messageToMeAgain">
                        {/* <img src={message.sender.avatarUrl} alt="" /> */}
                        <div className="messageTextAgain">
                          {/* <p className="creator">
                        {message.sender.fullName}
                        <span>
                          {new Date(message.createdAt).toLocaleString('ru', {
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </span>
                      </p> */}
                          <p>{message.text}</p>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <p className="empty">Здесь пока нет сообщений</p>
              )
            ) : (
              <>
                {/* <div className="messageToMe">
                  <ConversatioinSkeleton />
                </div>
                <div className="messageToMe">
                  <ConversatioinSkeleton />
                </div>
                <div className="messageToMe">
                  <ConversatioinSkeleton />
                </div>
                <div className="messageToMe">
                  <ConversatioinSkeleton />
                </div>
                <div className="messageToMe">
                  <ConversatioinSkeleton />
                </div> */}
              </>
            )}
          </div>
          <div className="conversation__bottom">
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => (e.code == 'Enter' ? sendHandler() : '')}
              type="text"
              placeholder="Введите сообщение..."
            />
            <button className="button" onClick={sendHandler}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
