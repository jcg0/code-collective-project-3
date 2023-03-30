import React, { useState, useEffect } from "react";

const ProfileList = ({ profiles, title, loading }) => {
  const [updateInput, setUpdateInput] = useState("");

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

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    switch (inputType) {
      case "bio":
        setProfileForm(inputValue);
        break;
      case "skills":
        setProfileForm(inputValue);
        break;
      case "interests":
        setProfileForm(inputValue);
        break;
      case "location":
        setProfileForm(inputValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    profiles.onSubmit({
      bio: profiles[0].bio,
      avatar: profiles[0].avatar,
      skills: profiles[0].skills,
      interests: profiles[0].interests,
      websites: profiles[0].websites,
      location: profiles[0].location,
    });

    setProfileForm(handleInputChange);
  };
  // debugger;
  return (
    <form className="flex flex-col text-center items-center space-y-4">
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
                  <img src={profile.avatar} alt="a squricle image" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Bio</h1>
              <div className="">
                <input
                  name="bio"
                  type="text"
                  value={profileForm.bio}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onclick={(e) => updateInputChange(e.target.value)}
                >
                  update bio
                </button>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Skills</h1>
              <div>
                <ul>
                  <input
                    name="skills"
                    type="text"
                    value={profileForm.skills}
                    onChange={handleInputChange}
                  />
                </ul>
                <button>update skills</button>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Interests</h1>
              <div>
                <ul>
                  <input
                    name="interests"
                    type="text"
                    value={profileForm.interests}
                    onChange={handleInputChange}
                  />
                </ul>
                <button>update interests</button>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Website</h1>
              <div>
                <ul>
                  <li>
                    {/* icon for edit */}
                    <i></i>
                    <a href={profile.websites}>{profile.websites}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="antialiased text-2xl font-extrabold">Location</h1>
              <div>
                <input
                  name="location"
                  type="text"
                  value={profileForm.location}
                  onChange={handleInputChange}
                />
              </div>
              <button>update location</button>
            </div>
          </>
        ))}
    </form>
  );
};

export default ProfileList;
