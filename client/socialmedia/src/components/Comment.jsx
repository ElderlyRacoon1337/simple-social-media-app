import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../redux/slices/postsSlice';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';

const Comment = ({
  commentData,
  isMyPost,
  postId,
  inputRef,
  setIsEditing,
  setCommentId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment({ postId, commentId: commentData._id }));
    setIsOpen(false);
  };

  let isMy = false;

  const token = localStorage.getItem('token');
  const decodedToken = token ? decode(token) : '';
  const userId = decodedToken._id;

  if (userId == commentData.user._id) {
    isMy = true;
  } else {
    isMy = false;
  }

  const handleEdit = () => {
    setIsOpen(false);
    console.log(commentData.text);
    inputRef.current.value = commentData.text;
    setIsEditing(true);
    setCommentId(commentData._id);
    inputRef.current.focus();
  };

  return (
    <div className="comment">
      <div className="commentTop">
        <Link to={`/user/${commentData.user._id}`} className="commentTopLeft">
          <img
            className="commentAvatar"
            width="100%"
            src={commentData.user.avatarUrl}
            alt=""
          />
          <div className="commentUser">
            <p className="commentName">{commentData.user.fullName}</p>
            <div className="comment-createdAt">
              {commentData.createdAt.length
                ? new Date(commentData.createdAt).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })
                : 'Несколько секунд назад'}
            </div>
          </div>
        </Link>
        {(isMyPost || isMy) && (
          <div className="postTopRight">
            <svg
              onClick={() => setIsOpen(!isOpen)}
              // onMouseLeave={() => setIsOpen(false)}
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
                {isMy && <p onClick={handleEdit}>Редактировать</p>}
                <p onClick={handleDelete}>Удалить</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="commentText">{commentData.text}</div>
    </div>
  );
};

export default Comment;
