import Post from '../components/Post';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setPostsLoading } from '../redux/slices/postsSlice';
import PostSkeleton from '../components/skeletons/PostSkeleton';

const News = () => {
  const posts = useSelector((state) => state.posts.posts.data);
  const dispatch = useDispatch();
  const isPostsLoading = useSelector((state) => state.posts.isPostsLoading);
  // const isPostsLoading = true;

  // const isPostsLoading = true;

  useEffect(() => {
    dispatch(fetchPosts());
    // dispatch(setPostsLoading(true));
  }, []);

  return (
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
  );
};

export default News;
