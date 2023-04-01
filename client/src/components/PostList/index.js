import React from "react";
import CommentsList from '../CommentsList';

const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h2>No Posts Yet!</h2>;
  }
  
  console.log(posts); 

  return (
    <div className="rounded-2xl post-list-container m-2">
      <br></br>
    <h2 className="text-center text-primary"><b>{title}</b></h2>
    <br></br>
    {posts && 
        posts.map((post) => (
            <div className="card shadow-xl m-2" key={post._id}>
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
                    <p className="bg-white p-3 rounded-md text-md"><code>{post.postContent}</code></p>
                    <p className="text-xs">This thought occured {post.createdAt}</p>
                    <div className="card-actions">
                        <CommentsList comments={post.comments} postId={post._id}/>
                    </div>
                </div>
            </div>
    ))}
    </div>
  )};

  export default PostList; 
