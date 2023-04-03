import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { REMOVE_POST } from "../../utils/mutations";
import CommentsList from "../CommentsList";
import Avatar from "../Avatar";

const PostList = ({ posts, firstName, lastName, username }) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(data); 

  const user = data?.me || data?.user || {};

  const [removePost, { error }] = useMutation(REMOVE_POST, {
    update(cache, { data: { removePost } } ) {
        try {
            cache.writeQuery({
                query: QUERY_ME, 
                data: { me: removePost }, 
            }); 
        } catch (err) {
            console.error(err); 
        }
    }
  }); 

  const handlePostRemove = async (postId) => {
    try {
        const { data } = await removePost({
            variables: { postId }, 
        }); 
    } catch(err) {
        console.error(err); 
    }
  }; 

  return (
    <div className="rounded-2xl post-list-container m-2">
      {posts &&
        posts
          .slice()
          .sort((post) => parseFloat(post.createdAt - 1))
          .map((post) => (
            <div className="card shadow-xl m-2" key={post._id}>
              <div className="card-body bg-primary-content rounded-xl">
                <Avatar firstName={firstName} lastName={lastName} size="sm" />
                <h3 className="card-title username ">{post.postAuthor}</h3>
                <p className="bg-white p-3 rounded-md text-md">
                  <code>{post.postContent}</code>
                </p>
                <p className="text-xs">
                  This thought occurred {post.createdAt}
                </p>
                <div className="card-actions">
                  <CommentsList comments={post.comments} postId={post._id} />
                </div>
                {user.username === post.postAuthor &&
                <button className="btn btn-sm" onClick={() => handlePostRemove(post._id)}>DELETE POST</button>
                }
              </div>
            </div>
          ))}
    </div>
  );
};

export default PostList;
