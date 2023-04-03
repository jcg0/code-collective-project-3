import React from "react";
import {
  generatePlaceholderName,
  generateRandomColor,
} from "../../utils/helpers";

const Avatar = ({ firstName, lastName }) => {
  let name = `${firstName} ${lastName}`;
  const userPlaceholder = generatePlaceholderName(name);
  const placeholderBackground = `hsla(${generateRandomColor()}, 50%, 50%, 1)`;

  return (
    <div
      className="avatar rounded-full placeholder"
      style={{ backgroundColor: placeholderBackground }}
    >
      <div className="text-neutral-content  w-24">
        <span className="text-3xl">{userPlaceholder}</span>
      </div>
    </div>
  );
};

export default Avatar;
