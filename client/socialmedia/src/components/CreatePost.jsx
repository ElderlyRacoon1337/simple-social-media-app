import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from '../axios';
import {
  createPost,
  fetchPostsByUser,
  setPostsLoading,
} from '../redux/slices/postsSlice';

const CreatePost = ({ user }) => {
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState('');

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    // axios.post('/posts', { text: inputValue, imageUrl });
    dispatch(createPost({ text: inputValue, imageUrl }));
    setInputValue('');
    // setTimeout(() => {
    // dispatch(fetchPostsByUser(location.pathname));
    // }, 1000);
    dispatch(setPostsLoading(true));
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(`http://localhost:5000${data.url}`);
    } catch (error) {
      console.log('Ошибка при загрузке файла');
    }
  };

  return (
    <div className="profile__block createPost">
      <div className="createPostLeft">
        <img src={user.avatarUrl} alt="" />
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Что нового?..."
          type="text"
        />
      </div>
      <div className="createPostRight">
        <input
          onChange={handleChangeFile}
          type="file"
          hidden
          ref={inputFileRef}
        />
        <button
          className="addFileBtn"
          onClick={() => inputFileRef.current.click()}
        >
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </button>
        <button onClick={handleSubmit} className="button">
          Добавить пост
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
