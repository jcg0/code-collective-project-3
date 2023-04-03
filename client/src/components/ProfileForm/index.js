import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { UPDATE_PROFILE } from "../../utils/mutations";

const ProfileForm = ({ profiles, title, loading }) => {
  const [clicked, setClicked] = useState(false);
  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE);
  const [profileForm, setProfileForm] = useState({
    bio: "",
    skills: [],
    interests: [],
    websites: [],
    location: "",
  });

  useEffect(() => {
    // debugger;
    if (profiles) {
      setProfileForm({
        bio: profiles.bio,
        skills: profiles.skills,
        interests: profiles.interests,
        websites: profiles.websites,
        location: profiles.location,
      });
    }
  }, [loading]);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = updateProfile({
        variables: { ...profileForm },
      });
    } catch (err) {
      console.error(err);
    }
    setClicked((prev) => !prev);
    // setProfileForm("");
  };

  const handleInputChange = (e) => {
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
      case "websites":
        setProfileForm({ ...profileForm, [name]: value });
        break;
      default:
        break;
    }
  };

  return (
    <div className="">
      {clicked ? (
        <>
          <form
            className="flex flex-col items-center text-start bg-secondary-focus"
            onSubmit={handleFormSubmit}
          >
            <label className="text-4xl" htmlFor="profile_bio">
              Bio
            </label>
            <textarea
              className="textarea bg-secondary textarea-accent w-full max-w-xs"
              name="bio"
              id="profile_bio"
              cols="35"
              rows="7"
              type="text"
              value={profileForm.bio}
              onChange={handleInputChange}
              placeholder="Add a bio"
            ></textarea>
            <label className="text-4xl" htmlFor="">
              Skills
            </label>
            <input
              className="input-md border-accent bg-secondary rounded input-bordered input-accent w-full max-w-xs"
              type="text"
              name="skills"
              value={profileForm.skills}
              onChange={handleInputChange}
              placeholder="Skills"
            />
            <button className="btn glass btn-wide bg-accent" type="button">
              add skill
            </button>
            <label className="text-4xl" htmlFor="">
              Interests
            </label>
            <input
              className="input-md bg-secondary rounded input-bordered input-accent w-full max-w-xs"
              type="text"
              name="interests"
              value={profileForm.interests}
              onChange={handleInputChange}
              placeholder="Interests"
            />
            <button className="btn glass btn-wide bg-accent" type="button">
              Add Interest
            </button>
            <label className="text-4xl" htmlFor="">
              Website
            </label>
            <input
              className="input-md border-accent bg-secondary rounded input-bordered input-accent w-full max-w-xs"
              type="text"
              name="websites"
              value={profileForm.websites}
              onChange={handleInputChange}
              placeholder="website"
            />
            <label className="text-4xl" htmlFor="">
              Location
            </label>
            <input
              className="input-md border-accent bg-secondary rounded input-bordered input-accent w-full max-w-xs"
              type="text"
              name="location"
              value={profileForm.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
            <button className="btn glass btn-wide bg-accent" type="submit">
              save
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="pt-1 bg-secondary-focus">
            <div className="card card-bordered bg-secondary border-white m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl">Bio</p>
              <p>{profileForm.bio}</p>
            </div>
            <div className="card card-bordered bg-secondary border-white m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl">Skills</p>
              <ul>
                {/* {profileForm.skills &&
                profileForm.skills.map((skills, index) => (
                  <li key={skills.name}>{skills.skills[index]}</li>
                ))} */}
                <li>{profileForm.skills}</li>
              </ul>
            </div>
            <div className="card card-bordered bg-secondary border-white m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl">Interests</p>
              <ul>
                {/* {profileForm.interests &&
                profileForm.interests.map((interests, index) => (
                  <li key={interests.name}>{interests.interests[index]}</li>
                ))} */}
                <li>{profileForm.interests}</li>
              </ul>
            </div>
            <div className="card card-bordered bg-secondary border-white m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl">Websites</p>
              <ul>
                {/* {profileForm.websites &&
                profileForm.websites.map((websites, index) => (
                  <li key={websites.name}>{websites.websites}</li>
                ))} */}
                <li>
                  <a href={profileForm.websites}>{profileForm.websites}</a>
                </li>
              </ul>
            </div>
            <div className="card card-bordered bg-secondary border-white m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl">Location</p>
              <p>{profileForm.location}</p>
            </div>
            <div className="flex flex-col items-center pb-6">
              <button
                className="btn glass btn-wide bg-accent"
                onClick={handleClick}
              >
                edit profile
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileForm;
