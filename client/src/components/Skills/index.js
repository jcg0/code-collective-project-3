import React from "react";

const Skills = ({ profile, title }) => {
  return (
    <div>
      <h2>Skills</h2>
      {profile &&
        profile.map((profile) => (
          <div key={profile._id}>
            <ul>
              <li>{profile.skills}bloooger</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Skills;
