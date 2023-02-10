import axios from '../axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  addComment,
  changeComment,
  deletePost,
  fetchPosts,
  fetchPostsByUser,
  setPostsLoading,
} from '../redux/slices/postsSlice';
import decode from 'jwt-decode';
import Comment from './Comment';

const Post = ({ postData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const likeButton = useRef();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const userData = useSelector((state) => state.user.userData);
  const [isEditing, setIsEditing] = useState(false);
  const [isPostEditing, setIsPostEditing] = useState(false);
  const [commentId, setCommentId] = useState('');
  const postPopup = useRef(null);
  const isOwnPage = useSelector((state) => state.user.isOwn);
  const params = useParams();
  const [isFullPost, setIsFullPost] = useState(false);
  const [commentsFull, setCommentsFull] = useState(false);

  const token = localStorage.getItem('token');
  const decodedToken = token ? decode(token) : '';
  const userId = decodedToken._id;
  const commentRef = useRef(null);
  const popupLike = useRef(null);

  const inputRef = useRef();

  let isMyPost = false;
  if (userId == postData?.user?._id) {
    isMyPost = true;
  } else {
    isMyPost = false;
  }

  const handleDelete = (id) => {
    setIsOpen(false);
    dispatch(deletePost(id));
  };

  const handleEdit = () => {
    setIsOpen(false);
    setIsPostEditing(true);
    setCommentValue(postData.text);
    inputRef.current.focus();
  };

  const onLike = () => {
    axios.patch(`/posts/${postData._id}/likePost`);

    if (!isLiked) {
      setLikes([...likes, userId]);
    } else {
      setLikes(likes.filter((id) => id !== userId));
    }

    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(Boolean(postData.likes.find((e) => e == userId)));

    setLikes(postData.likes);
  }, []);

  useEffect(() => {
    if (isLiked) {
      likeButton.current.className = 'button liked';
      if (isFullPost) {
        popupLike.current.className = 'button liked';
      }
    } else {
      likeButton.current.className = 'button';
      if (isFullPost) {
        popupLike.current.className = 'button';
      }
    }
  }, [isLiked, isFullPost]);

  const handleAddComment = () => {
    if (!isEditing && !isPostEditing) {
      setCommentValue('');
      dispatch(addComment({ id: postData._id, value: commentValue }));
      setCommentsFull(true);
    } else if (isEditing) {
      setCommentValue('');
      dispatch(setPostsLoading(true));
      axios
        .patch(`/posts/${postData._id}/updateComment`, {
          postId: postData._id,
          commentId: commentId,
          text: commentValue,
        })
        .then((res) => {
          dispatch(fetchPostsByUser(params.id));
          dispatch(fetchPosts(params.id));
        });
      setIsEditing(false);
    } else {
      dispatch(setPostsLoading(true));
      axios
        .patch(`/posts/${postData._id}`, { text: commentValue })
        .then((res) => {
          dispatch(fetchPostsByUser(params.id));
          dispatch(fetchPosts(params.id));
        });
      setCommentValue('');
      setIsPostEditing(false);
    }
  };

  const onClickPost = (e) => {
    setIsFullPost(true);
    document.body.style.overflow = 'hidden';
  };

  const onClickComment = () => {
    commentRef.current.className =
      commentRef.current.className == 'comments hidden'
        ? 'comments'
        : 'comments hidden';
  };

  return (
    <>
      <div className="post block">
        {isFullPost && (
          <div
            onClick={(e) => {
              if (!e.target.contains(postPopup.current)) {
                setIsFullPost(true);
              } else {
                document.body.style.overflow = 'scroll';
                setIsFullPost(false);
              }
            }}
            className="postPopupp"
          >
            <div
              ref={postPopup}
              className="fullPost"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="postLeft">
                <div className="top">
                  <div className="postTop">
                    <Link
                      to={`/user/${postData.user._id}`}
                      className="postTopLeft"
                    >
                      <img
                        width="100%"
                        src={postData.user.avatarUrl || userData.avatarUrl}
                        alt=""
                      />
                      <div className="postUser">
                        <p>{postData.user.fullName || userData.fullName}</p>
                        <div className="createdAt">
                          {new Date(postData.createdAt).toLocaleString('ru', {
                            // year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </div>
                      </div>
                    </Link>
                    {isMyPost && (
                      <div className="postTopRight">
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
                            <p onClick={() => handleEdit()}>Редактировать</p>
                            <p onClick={() => handleDelete(postData._id)}>
                              Удалить
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="postContent">
                    {postData.text ? (
                      <p className="postText">{postData.text}</p>
                    ) : (
                      ''
                    )}
                    {postData.imageUrl ? (
                      <img
                        className="postImage"
                        src={postData.imageUrl}
                        alt=""
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="postBottom">
                  <div className="postBottom__left">
                    <button
                      className="button"
                      // ref={likeButton}
                      ref={popupLike}
                      onClick={onLike}
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
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <p>{likes.length}</p>
                    </button>
                    <button className="button">
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
                          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                      <p>{postData.comments.length}</p>
                    </button>
                  </div>
                  <div className="postBottom__right">
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="viewsCount">{postData.viewsCount}</p>
                  </div>
                </div>
              </div>
              <div className="postRight">
                <div className="comments">
                  <div className="comms">
                    {postData.comments.map((comm) => (
                      <Comment
                        setCommentId={setCommentId}
                        setIsEditing={setIsEditing}
                        inputRef={inputRef}
                        commentData={comm}
                        isOwnPage={isOwnPage}
                        postId={postData._id}
                        postUser={postData.user._id}
                        isMyPost={isMyPost}
                      />
                    ))}
                  </div>
                  <div className="addComment">
                    <img src={userData.avatarUrl} alt="" />
                    <input
                      onKeyDown={(e) =>
                        e.code == 'Enter' ? handleAddComment() : ''
                      }
                      ref={inputRef}
                      type="text"
                      value={commentValue}
                      onChange={(e) => setCommentValue(e.target.value)}
                    />
                    <button onClick={handleAddComment} className="button">
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div onClick={onClickPost}>
          <div className="postTop">
            <Link to={`/user/${postData.user._id}`} className="postTopLeft">
              <img
                width="100%"
                src={postData.user.avatarUrl || userData.avatarUrl}
                alt=""
              />
              <div className="postUser">
                <p>{postData.user.fullName || userData.fullName}</p>
                <div className="createdAt">
                  {new Date(postData.createdAt).toLocaleString('ru', {
                    // year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </div>
              </div>
            </Link>
            {isMyPost && (
              <div className="postTopRight">
                <svg
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
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
                    <p onClick={() => handleEdit()}>Редактировать</p>
                    <p onClick={() => handleDelete(postData._id)}>Удалить</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="postContent">
            {postData.text ? <p className="postText">{postData.text}</p> : ''}
            {postData.imageUrl ? (
              <img className="postImage" src={postData.imageUrl} alt="" />
            ) : (
              ''
            )}
          </div>
          <div className="postBottom">
            <div className="postBottom__left">
              <button
                className="button"
                ref={likeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike();
                }}
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <p>{likes.length}</p>
              </button>
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickComment(e);
                }}
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
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                <p>{postData.comments.length}</p>
              </button>
            </div>
            <div className="postBottom__right">
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="viewsCount">{postData.viewsCount}</p>
            </div>
          </div>
          <div
            ref={commentRef}
            className="comments"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!commentsFull
              ? postData.comments
                  .slice(0, 2)
                  .map((comm) => (
                    <Comment
                      setCommentId={setCommentId}
                      setIsEditing={setIsEditing}
                      inputRef={inputRef}
                      commentData={comm}
                      isOwnPage={isOwnPage}
                      postId={postData._id}
                      postUser={postData.user._id}
                      isMyPost={isMyPost}
                    />
                  ))
              : postData.comments.map((comm) => (
                  <Comment
                    setCommentId={setCommentId}
                    setIsEditing={setIsEditing}
                    inputRef={inputRef}
                    commentData={comm}
                    isOwnPage={isOwnPage}
                    postId={postData._id}
                    postUser={postData.user._id}
                    isMyPost={isMyPost}
                  />
                ))}

            {postData.comments.length > 2 && !commentsFull && (
              <p
                onClick={(e) => {
                  setCommentsFull(true);
                }}
                className="button seeAll"
              >
                Посмотреть все комментарии
              </p>
            )}
            <div className="addComment">
              <img src={userData.avatarUrl} alt="" />
              <input
                onKeyDown={(e) => (e.code == 'Enter' ? handleAddComment() : '')}
                ref={inputRef}
                type="text"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <button onClick={handleAddComment} className="button">
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
