import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER, QUERY_USER_LIST } from "../utils/queries";
import Auth from "../utils/auth";
import { useParams, Navigate } from "react-router-dom";
import FriendsList from "../components/Friends/FriendsList";
import FindFriends from "../components/Friends/FindFriends";

const Friends = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(QUERY_ME);
  console.log(QUERY_USER);

  // Check if data is returning from the `QUERY_ME` query
  const user = data?.me || data?.user || {};
  console.log(user.friendsList)
  if (Auth.loggedIn() && Auth.getFriends().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!friendList.length) {
  //   return <h3>You have not added any friends yet!</h3>;
  // }

  return (
    <div className="flex flex-col items-center text-center bg-neutral space-y-20">
      <div className="bg-secondary w-100">
      <h1 className="antialiased text-2xl fs-1 text-primary-content font-extrabold rounded p-1 m-1 border border-white">Friends List</h1>
      
      <h2 className="antialiased text-2xl fs-3 text-primary-content font-extrabold rounded p-1 m-1 border border-white">Click on a friends name to view their profile!</h2>
       </div>
      <FriendsList users={user.friendsList} />
      <div className="bg-secondary">
      <h1 className="antialiased text-2xl text-primary-content font-extrabold rounded p-1 m-1 border border-white">Add More Friends</h1>
      </div>
        <FindFriends />
    </div>
  );
};

export default Friends;
