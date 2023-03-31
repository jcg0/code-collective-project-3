import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_PROFILE } from "../../utils/mutations";
import "../../index.css";

const ProfileList = ({ profiles, title, loading }) => {
  // const [updateInput, setUpdateInput] = useState("");
  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE);

  const [profileForm, setProfileForm] = useState({
    bio: "",
    avatar: "",
    skills: "",
    interests: "",
    websites: "",
    location: "",
  });

  useEffect(() => {
    // debugger;
    if (profiles) {
      setProfileForm({
        bio: profiles[0].bio,
        avatar: profiles[0].avatar,
        skills: profiles[0].skills,
        interests: profiles[0].interests,
        websites: profiles[0].websites,
        location: profiles[0].location,
      });
    }
  }, [loading]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = updateProfile({
        variables: { ...profileForm },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    // const { target } = e;
    // const inputType = target.name;
    // const inputValue = target.value;
    const { name, value } = e.target;

    switch (name) {
      case "bio":
        setProfileForm({ ...profileForm, [name]: value });
        break;
      case "skills":
        setProfileForm({ ...profileForm, [name]: value });
        break;
      case "interests":
        setProfileForm({ ...profileForm, [name]: value });
        break;
      case "location":
        setProfileForm({ ...profileForm, [name]: value });
        break;
      default:
        break;
    }

    // setProfileForm(inputValue);
  };

  // const profileChangeHandler = (e) => {
  //   setProfileForm((prevState) => {
  //     return {
  //       ...prevState,
  //       bio: e.target.value,
  //       avatar: e.target.value,
  //       skills: e.target.value,
  //       interests: e.target.value,
  //       websites: e.target.value,
  //       location: e.target.value,
  //     };
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   profiles.onSubmit({
  //     bio: profiles[0].bio,
  //     avatar: profiles[0].avatar,
  //     skills: profiles[0].skills,
  //     interests: profiles[0].interests,
  //     websites: profiles[0].websites,
  //     location: profiles[0].location,
  //   });

  //   setUpdateInput(e.target.value);
  // };

  // const editProfileItem = (profileId, newValue) => [
  //   if()
  // ]
  // debugger;
  return (
    <form
      className="flex flex-col items-center text-center space-y-20"
      onSubmit={handleFormSubmit}
    >
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
                  {/* icon for edit */}
                  <i></i>
                  <img src={profileForm.avatar} alt="a squricle image" />
                </div>
              </div>
            </div>
            <div key={profile._id}>
              <label className="antialiased text-2xl font-extrabold">
                Bio
                <input
                  name="bio"
                  type="text"
                  value={profileForm.bio}
                  onChange={handleInputChange}
                  className="input input-ghost w-full max-w-xs custom-profile-input-size"
                />
              </label>
            </div>
            <div key={profile._id}>
              <label className="antialiased text-2xl font-extrabold">
                Skills
              </label>
              <div>
                <ul>
                  <input
                    name="skills"
                    type="text"
                    value={profileForm.skills}
                    onChange={handleInputChange}
                    className="input input-ghost w-full max-w-xs"
                  />
                </ul>
              </div>
            </div>
            <div key={profile._id}>
              <label className="antialiased text-2xl font-extrabold">
                Interests
              </label>
              <div>
                <ul>
                  <input
                    name="interests"
                    type="text"
                    value={profileForm.interests}
                    onChange={handleInputChange}
                    className="input input-ghost w-full max-w-xs"
                  />
                </ul>
              </div>
            </div>
            <div key={profile._id}>
              <h1 className="antialiased text-2xl font-extrabold">Links</h1>
              <div>
                <ul>
                  <li>
                    {/* icon for edit */}
                    <i></i>
                    <a href={profileForm.websites}>{profile.websites}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div key={profile._id}>
              <label className="antialiased text-2xl font-extrabold">
                Location
              </label>
              <div>
                <input
                  name="location"
                  type="text"
                  value={profileForm.location}
                  onChange={handleInputChange}
                  className="input input-ghost w-full max-w-xs"
                />
              </div>
            </div>
          </>
        ))}
      <button
        className="flex flex-row"
        name="bio"
        type="submit"
        onClick={() => {}}
      >
        update
      </button>
    </form>
  );
};

export default ProfileList;
