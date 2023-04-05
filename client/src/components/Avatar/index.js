import React from "react";
import {
  generatePlaceholderName,
  generateRandomColor,
  generateRandomPercent,
} from "../../utils/helpers";

const Avatar = ({ firstName, lastName }) => {
  let name = `${firstName} ${lastName}`;
  const userPlaceholder = generatePlaceholderName(name);
  // const placeholderBackground = `hsla(${generateRandomColor()}, ${generateRandomPercent()}, ${generateRandomPercent()}, 1)`;

  return (
    <div
      className="avatar bg-accent place-content-center w-48 h-48 rounded-full placeholder grid grid-cols"
      // style={{ backgroundColor: placeholderBackground }}
    >
      <p className="text-6xl text-slate-950">{userPlaceholder}</p>
    </div>
  );
};

export default Avatar;
