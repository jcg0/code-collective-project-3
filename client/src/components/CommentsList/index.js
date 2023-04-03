import React from "react";
import CommentForm from '../CommentForm/index'; 

const CommentsList = ({ comments = [], postId }) => {

    
  return (
    <div>
    <div className="collapse collapse-arrow bg-secondary-focus rounded-xl">
      <input type="checkbox" />
      <div className="collapse-title text-sm font-medium">Show comments</div>
      {( comments.length === 0) ? (
        <div className="collapse-content">
        <p className="text-sm">No comments for this post; add yours below!</p>
        </div>
      ) : (
        <>
          <div className="collapse-content">
            {/* <CommentForm postId={postId}/> */}
            {comments.map((comment) => (
              <div className="py-1"key={comment._id}>
                <p className="text-sm my-1"><b>{comment.commentAuthor}</b></p>
                <p className="bg-white p-3 rounded-md text-sm">{comment.commentText}</p>
                <p className="text-xs my-1">{comment.createdAt}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    <CommentForm postId={postId}/>
    </div>
  );
};

export default CommentsList;
