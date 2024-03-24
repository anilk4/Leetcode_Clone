import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./Style.css";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./Api";

const Comments = ({ commentsUrl, currentUserId }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment?.parentId === null
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment?.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId, token).then((comment) => {
      // After adding a new comment, fetch all comments again
      fetchComments();
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId, token).then(() => {
      fetchComments();
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId, token).then(() => {
        fetchComments();
      });
    }
  };

  const fetchComments = () => {
    getCommentsApi(token).then((data) => {
      const ReversedComments = data.data.comments.reverse();
      setBackendComments(ReversedComments);
      console.log('All backend comments',backendComments);
    });
  };

  useEffect(() => {
    fetchComments();
    setToken(localStorage.getItem("userToken"));
  }, [token]);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
