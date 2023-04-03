import React from "react";
import {
  generatePlaceholderName,
  generateRandomColor,
} from "../../utils/helpers";

const Avatar = ({ firstName, lastName }) => {
  
  let name = `${firstName} ${lastName}`;
  const userPlaceholder = generatePlaceholderName(name);
  const placeholderBackground = `hsl$(${generateRandomColor()})`;

  return (
    <div
      className="avatar placeholder"
      style={{ backgroundColor: placeholderBackground }}
    >
      <div className="text-neutral-content bg-primary-content rounded-full w-24">
        <span className="text-3xl">{userPlaceholder}</span>
      </div>
    </div>
  );
};

export default Avatar;
