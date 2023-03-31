import React from "react";

const CommentsList = ({ comments = [] }) => {
//   if (!posts.comments) {
//     return <h4>No comments for this post yet.</h4>
//   }
    return (
    <div className="collapse">
      <input type="checkbox" />
      <div className="collapse-title text-m font-medium">
        Show comments
      </div>
      {!comments ? (
        <div className="collapse-content">
            <p>No comments for this post yet.</p>
        </div>
      ) : (
        <>
        <div className="collapse-content">
            {comments.map((comment) => (
            <>
              <p>{comment.commentText}</p>
              <p>{comment.commentAuthor}</p>
              <p>{comment.createdAt}</p>
            </>
            ))}
        </div>
        </>
      )}
      </div>

    // <div tabIndex={0} className="collapse group">
    //     <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
    // View Comments
    // </div>
    // <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
    //     {post.comments
    //         ? <p>tabIndex={0} attribute is necessary to make the div focusable</p>
    //         :  <p>No comments yet!</p>
    //     }
    // </div>
    // </div>
  );
};

export default CommentsList;
