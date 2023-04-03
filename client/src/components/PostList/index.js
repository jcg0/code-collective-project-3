import React from "react";
import CommentsList from '../CommentsList';
import Avatar from '../Avatar'; 

const PostList = ({ posts, firstName, lastName }) => {


  return (
    <div className="rounded-2xl post-list-container m-2 md:flex-wrap">

    {posts && 
        posts.slice().sort((post) => parseFloat(post.createdAt-1)).map((post) => (
            <div className="card shadow-xl m-2" key={post._id}>
                <div className="card-body bg-secondary-focus rounded-xl">
                    <Avatar firstName={firstName} lastName={lastName} className='justify-center' />
                    <h3 className="card-title username text-primary-content">{post.postAuthor}</h3>
                    <p className="bg-white p-3 rounded-md text-md text-primary-focus"><code>{post.postContent}</code></p>
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
