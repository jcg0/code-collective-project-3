import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_LIST } from "../utils/queries";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USER_LIST);

  const users = data?.users || [];
  console.log(users);

  return (
    <main className="home-container bg-secondary">
      <div className="card justify-start object-center ">
        <PostForm />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {users &&
            users.map((user) => (
              <PostList
                posts={user.posts}
                firstName={user.firstName}
                lastName={user.lastName}
                username={user.username}
              />
            ))}
        </>
      )}
    </main>
  );
};

export default Home;
