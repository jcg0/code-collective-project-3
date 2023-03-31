import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import PostForm from '../components/PostForm'; 
import PostList from '../components/PostList'; 

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  const posts = data?.posts || []; 

  return (
    <main className="home-container w-screen">
      <div className="card w-screen m-3 bg-base-100 shadow-xl">
        <PostForm />
      </div>
        {loading ? 
        (<div>Loading...</div>
        ) : (
        <PostList posts={posts} title="Some posts to peruse..."/>
        )}
    </main>
  );
};

export default Home;
