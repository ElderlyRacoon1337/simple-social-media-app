import Post from '../components/Post';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postsSlice';
import Navigation from '../components/Navigation';

const News = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (!posts) return;

  return (
    <div className="content">
      <Navigation />
      <div className="news">
        <div className="news__left">
          <div className="allPosts">
            <Post />
            <Post />
            <Post />
          </div>
        </div>
        <div className="news__right"></div>
      </div>
    </div>
  );
};

export default News;
