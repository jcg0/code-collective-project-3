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
const user2 = data2?.me || data2?.user || [];
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
    <div className="flex flex-col items-center text-center space-y-20">
      <h1 className="antialiased text-2xl font-extrabold">Friends List</h1>
      <FriendsList friendsList={user.friendsList} />
      <h1 className="antialiased text-2xl font-extrabold">Add More Friends</h1>
      <FindFriends />
    </div>
  );
};

export default Friends;
