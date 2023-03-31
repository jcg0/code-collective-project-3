import React from "react";
import { CommentsList } from '../CommentsList';

const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h2>No Posts Yet!</h2>;
  }

  console.log(posts); 

  return (
    <div className="rounded-2xl post-list-container p-2">
    <h2 className="text-center text-primary">{title}</h2>
    {posts && 
        posts.map((post) => (
            <div className="card w-screen my-4  shadow-xl" key={post._id}>
                <div className="card-body bg-primary-content rounded-xl">
                    {/* <div className="avatar">
                    <div className="w-8 rounded">
                        <img
                        src={post.postContent}
                        alt="Tailwind-CSS-Avatar-component"
                        />
                    </div>
                    </div> */}
                    <h3 className="card-title username ">{post.postAuthor}</h3>
                    <p className="bg-secondary p-2 rounded-md">{post.postContent}</p>
                    <p className="text-xs">This thought occured {post.createdAt}</p>
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
