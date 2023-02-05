import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, fetchPostsByUser } from '../redux/slices/postsSlice';
import decode from 'jwt-decode';

const Comment = ({ commentData, isOwnPage, isMyPost, postId }) => {
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

  if (userId == commentData.userId) {
    isMy = true;
  } else {
    isMy = false;
  }

  return (
    <div className="comment">
      <div className="commentTop">
        <div className="commentTopLeft">
          <img
            className="commentAvatar"
            width="100%"
            src={commentData.avatarUrl}
            alt=""
          />
          <div className="commentUser">
            <p className="commentName">{commentData.user}</p>
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
        </div>
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
                {isMy && <p>Редактировать</p>}
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
