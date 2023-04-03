import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ProfileList from "../components/ProfileList";
import Avatar from "../components/Avatar";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h4>Please login to view this profile.</h4>;
  }

  return (
    <div>
      <div className="">
        <h1 className="text-center text-6xl pt-6">
          {userParam ? `${user.username}'s` : "Your"} profile.
        </h1>
        <div className="p-5 flex flex-col items-center">
          <Avatar firstName={user.firstName} lastName={user.lastName} />
        </div>

        <div>
          {/* <ProfileList profiles={user.profile} loading={loading} /> */}
          <ProfileForm profiles={user.profile} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
