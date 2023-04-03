import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import Auth from "../../utils/auth";
// import { addTypenameToDocument } from "@apollo/client/utilities";

const PostForm = () => {
  const [formState, setFormContent] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
        console.log("its in the update");
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: { postContent: formState },
      });

      setFormContent("");
    } catch (err) {
      console.error(err);
      console.log("form submit is the issue");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postContent" && value.length <= 280) {
      setFormContent(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="form-control p-4 m-2">
      <h2 className="pb-2 text-primary-content">
        <b>What's got your gears going?</b>
      </h2>
      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <textarea
              name="postContent"
              type="text"
              value={formState}
              placeholder="Type here"
              className="textarea textarea-bordered w-full max-w-screen-md bg-white text-black"
              onChange={handleChange}
            />
            <label className="label">
              <span className="label-text-alt text-primary-content">{characterCount}/280</span>
            </label>
            <button
              className="btn btn-accent btn-block content-center text-primary"
              type="submit"
            >
              Post
            </button>
            {error && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error.message}</span>
                </div>
              </div>
            )}
          </form>
        </>
      ) : (
        <form>
          <div className="alert alert-warning">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>You must be logged in to post.</span>
            </div>
          </div>
          <input
            type="text"
            placeholder="You can't touch this"
            className="input input-bordered"
            disabled
          />
          <button
            className="btn btn-disabled bg-secondary"
            tabindex="-1"
            role="button"
            aria-disabled="true"
          >
            Submit
          </button>
          <Link to="/login">Login</Link> or <Link to="signup">Signup</Link>
        </form>
      )}
    </div>

  );
};

export default PostForm;
