import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import { addTypenameToDocument } from "@apollo/client/utilities";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");
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
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME.definitions,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await addPost({
  //       variables: {
  //         postText,
  //         postAuthor,
  //       },
  //     });

  //     setPostContent("");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postContent" && value.length <= 280) {
      setPostContent(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="card w-screen m-3 bg-base-100 shadow-xl">
      <div className="form-control w-full max-w-xs">
        <h2>What's got your gears going></h2>
        {/* <label className="label">
            <span className="label-text">What's got your gears going?</span>
        </label> */}
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text-alt">Bottom Left label</span>
          <span className="label-text-alt">Bottom Right label</span>
        </label>
      </div>
    </div>
  );
};

export default PostForm;
