import React, { useState } from "react";
// import Skills from "../Skills";

const ProfileList = ({ profiles, title }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1>{title}</h1>
      {profiles &&
        profiles.map((profile) => (
          <>
            <div key={profile._id}>
              <h1 className="antialiased text-2xl font-extrabold">
                Profile Picture
              </h1>
              <div className="avatar">
                <div className="w-24 mask mask-squircle border-2 border-rose-500">
                  <img src={profile.avatar} alt="a squricle image" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl border-2 border-b-green-800">Bio</h1>
              <div className="">
                <p>{profile.bio}</p>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Skills</h1>
              <div>
                <ul>
                  <li>{profile.skills}</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Interests</h1>
              <div>
                <ul>
                  <li>{profile.interests}</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Website</h1>
              <div>
                <ul>
                  <li>
                    <a href={profile.websites}>{profile.websites}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Location</h1>
              <div>
                <p>{profile.location}</p>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default ProfileList;
