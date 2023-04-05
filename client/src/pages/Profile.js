import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import ProfileList from "../components/ProfileList";
import Avatar from "../components/Avatar";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import ProfileForm from "../components/ProfileForm";
// import "../index.css";
import prof_mountain from "../assets/images/profile_mtn.webp";

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
    <div className="">
      <div className="bg-secondary">
        <div className=" flex flex-col items-center">
          {/* <img id="profile-mtn" src={prof_mountain} alt="" /> */}
          <h1 className="text-center text-6xl text-stone-200 font-extrabold pt-6 m-4">
            {userParam ? `${user.username}'s` : "Your"} profile
          </h1>

          <Avatar
            className=""
            firstName={user.firstName}
            lastName={user.lastName}
          />
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
