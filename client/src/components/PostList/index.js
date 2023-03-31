import React from "react";
import { CommentsList } from '../CommentsList';

const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h2>No Posts Yet!</h2>;
  }

  console.log(posts); 

  return (
    <div className="post-list-container">
    <h2>{title}</h2>
    {posts && 
        posts.map((post) => (
            <div className="card w-screen m-3 bg-base-100 shadow-xl">
                <div className="card-body bg-secondary">
                    {/* <div className="avatar">
                    <div className="w-8 rounded">
                        <img
                        src={post.postContent}
                        alt="Tailwind-CSS-Avatar-component"
                        />
                    </div>
                    </div> */}
                    <h3 className="card-title username">{post.postAuthor}</h3>
                    <p>{post.postContent}</p>
                    <p>This thought occured {post.createdAt}</p>
                    <div className="card-actions justify-end">
                        <p>Put comments here eventually.</p>
                    {/* <div tabIndex={0} className="collapse group">
                        <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
                            View Comments
                        </div>
                        <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content"> 
                            {post.comments 
                            ? <p>tabIndex={0} attribute is necessary to make the div focusable</p>
                            :    
                            }
                            
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
    ))}
    </div>
  )};

  export default PostList; 
