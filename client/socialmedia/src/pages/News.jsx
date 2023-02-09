import Post from '../components/Post';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setPostsLoading } from '../redux/slices/postsSlice';
import PostSkeleton from '../components/skeletons/PostSkeleton';
import Navigation from '../components/Navigation';
import { fetchProfileData } from '../redux/slices/userSlice';

const News = () => {
  const posts = useSelector((state) => state.posts.posts.data);
  const dispatch = useDispatch();
  const isPostsLoading = useSelector((state) => state.posts.isPostsLoading);
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchProfileData(user._id));
  }, [user._id]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Navigation />
      <div className="news">
        <div className="news__left">
          <div className="allPosts">
            {!isPostsLoading ? (
              Array.isArray(posts) ? (
                posts.map((post) => {
                  return (
                    <Post key={post._id} postData={post} isOwnPage={false} />
                  );
                })
              ) : (
                ''
              )
            ) : (
              <>
                <div className="post block skeletPost">
                  <PostSkeleton />
                </div>
                <div className="post block skeletPost">
                  <PostSkeleton />
                </div>
                <div className="post block skeletPost">
                  <PostSkeleton />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="news__right"></div>
      </div>
    </>
  );
};

export default News;
