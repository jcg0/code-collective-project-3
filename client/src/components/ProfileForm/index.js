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
            className="flex flex-col items-center text-start bg-neutral"
            onSubmit={handleFormSubmit}
          >
            <label
              className="text-4xl text-stone-200 font-extrabold"
              htmlFor="profile_bio"
            >
              Bio
            </label>
            <textarea
              className="textarea bg-secondary textarea-accent w-full max-w-xs"
              name="bio"
              id="profile_bio"
              cols="30"
              rows="7"
              type="text"
              value={profileForm.bio}
              onChange={handleInputChange}
              placeholder="Add a bio"
            ></textarea>
            <label
              className="text-4xl text-stone-200 font-extrabold"
              htmlFor=""
            >
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
            <button
              id="int-skl-btn"
              className="m-4 btn glass bg-accent text-slate-950"
              type="button"
            >
              add skill
            </button>
            <label
              className="text-4xl text-stone-200 font-extrabold"
              htmlFor=""
            >
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
            <button
              id="int-skl-btn"
              className="m-4 btn glass bg-accent text-slate-950"
              type="button"
            >
              Add Interest
            </button>
            <label
              className="text-4xl text-stone-200 font-extrabold"
              htmlFor=""
            >
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
            <label
              className="text-4xl text-stone-200 font-extrabold"
              htmlFor=""
            >
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
            <button
              id="prof-btn"
              className="m-4 btn glass bg-accent text-slate-950"
              type="submit"
            >
              save
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="pt-1 bg-focus">
            <div className="card card-bordered bg-secondary border-accent m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl text-stone-200 font-extrabold">Bio</p>
              <p className="text-stone-200">{profileForm.bio}</p>
            </div>
            <div className="card card-bordered bg-secondary border-accent m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl text-stone-200 font-extrabold">Skills</p>
              <ul>
                {/* {profileForm.skills &&
                profileForm.skills.map((skills, index) => (
                  <li key={skills.name}>{skills.skills[index]}</li>
                ))} */}
                <li className="text-stone-200">{profileForm.skills}</li>
              </ul>
            </div>
            <div className="card card-bordered bg-secondary border-accent m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl text-stone-200 font-extrabold">
                Interests
              </p>
              <ul>
                {/* {profileForm.interests &&
                profileForm.interests.map((interests, index) => (
                  <li key={interests.name}>{interests.interests[index]}</li>
                ))} */}
                <li className="text-stone-200">{profileForm.interests}</li>
              </ul>
            </div>
            <div className="card card-bordered bg-secondary border-accent m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl text-stone-200 font-extrabold">Websites</p>
              <ul>
                {/* {profileForm.websites &&
                profileForm.websites.map((websites, index) => (
                  <li key={websites.name}>{websites.websites}</li>
                ))} */}
                <li>
                  <a className="text-stone-200" href={profileForm.websites}>
                    {profileForm.websites}
                  </a>
                </li>
              </ul>
            </div>
            <div className="card card-bordered bg-secondary border-accent m-5 p-5 shadow-2xl shadow-black">
              <p className="text-4xl text-stone-200 font-extrabold">Location</p>
              <p className="text-stone-200">{profileForm.location}</p>
            </div>
            <div className="flex flex-col items-center pb-6">
              <button
                className="btn glass btn-wide bg-accent text-slate-950"
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
