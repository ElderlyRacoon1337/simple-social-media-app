import axios from '../axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { io } from 'socket.io-client';

const Conversation = () => {
  const user = useSelector((state) => state.user.userData);
  const [messages, setMessages] = useState([]);
  const conversationId = useParams();
  const [conversations, setConversations] = useState([]);
  const [value, setValue] = useState('');
  const areaRef = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState('');
  const currentConversation = conversations.find(
    (el) => el._id == conversationId.id
  );
  const socket = useRef();

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
        .then((res) => setMessages(res.data));
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
    socket.current.on('getUsers', (users) => {
      console.log(users);
    });
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
      .then((res) => setMessages(res.data));
  }, []);

  const sendHandler = async () => {
    await axios.post('messages', {
      conversationId: conversationId.id,
      sender: user._id,
      text: value,
    });
    await axios
      .get('/messages/' + conversationId.id)
      .then((res) => setMessages(res.data));
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
            <Link to="/messenger" className="back">
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
          </div>

          <div ref={areaRef} className="conversation__content">
            {messages.length ? (
              messages?.map((message) => {
                if (message.sender._id == user._id) {
                  return (
                    <div className="messageToMe">
                      <img src={message.sender.avatarUrl} alt="" />
                      <div className="messageText">
                        <p className="creator">{message.sender.fullName}</p>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="messageToMe">
                      <img src={message.sender.avatarUrl} alt="" />
                      <div className="messageText">
                        <p className="creator">{message.sender.fullName}</p>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <p className="empty">Здесь пока нет сообщений</p>
            )}
          </div>
          <div className="conversation__bottom">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
