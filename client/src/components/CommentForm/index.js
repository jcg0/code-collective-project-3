import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import Auth from "../../utils/auth";

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = addComment({
        variables: {
          postId, 
          commentText: commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (event) => {
    const { name, defaultValue } = event.target;

    if (name === "commentText" && defaultValue.length <= 280) {
      setCommentText(defaultValue);
      setCharacterCount(defaultValue.length);
    }
  };

  return (
    <div className="collapse rounded-xl">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-primary text-primary-content text-center">
      +
      </div>
      <div className="collapse-content bg-primary text-primary-content">
        <form onSubmit={handleFormSubmit}>
          <textarea
            name="commentText"
            type="text"
            defaultValue={commentText.commentText}
            placeholder="Leave your comment here"
            className="textarea textarea-bordered w-full bg-white"
            onChange={handleCommentChange}
          />
          <label className="label">
            <span className="label-text-alt text-primary-content">{characterCount}/280</span>
          </label>
          <button
            className="btn btn-secondary btn-wide justify-center"
            type="submit"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;