import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { REMOVE_COMMENT } from "../../utils/mutations";
import CommentForm from "../CommentForm/index";

const CommentsList = ({ comments = [], postId }) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(data);

  const user = data?.me || data?.user || {};

  const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
    update(cache, { data: { removeComment } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeComment },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  // const handleCommentRemove = async () => {
  //   try {
  //     const { data } = await removeComment({
  //       variables: {
  //         postId,
  //         commentId
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-m font-medium">Show comments</div>
        {comments.length === 0 ? (
          <div className="collapse-content">
            <p className="text-sm">
              No comments for this post; add yours below!
            </p>
          </div>
        ) : (
          <>
            <div className="collapse-content">
              {comments.map((comment) => (
                <>
                <div className="py-1" key={comment._id}>
                  <p className="text-sm my-1">{comment.commentAuthor}</p>
                  <p className="bg-white p-3 rounded-md text-sm">
                    {comment.commentText}
                  </p>
                  <p className="text-xs my-1">{comment.createdAt}</p>
                </div>
                {/* {user.username === comment.commentAuthor && (
                  <button className="btn btn-sm" onClick={() => handleCommentRemove()}>DELETE COMMENT</button>)} */}
                </>
              ))}
            </div>
          </>
        )}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentsList;
