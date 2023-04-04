import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      </div>
    </footer>
    // <footer className="w-100 mt-auto bg-secondary p-4">
    //   <div className="container text-center mb-5">
    //     {location.pathname !== '/' && (
    //       <button
    //         className="btn btn-dark mb-3"
    //         onClick={() => navigate(-1)}
    //       >
    //         &larr; Go Back
    //       </button>
    //     )}
    //     <h4>
    //       Made with{' '}
    //       <span
    //         className="emoji"
    //         role="img"
    //         aria-label="heart"
    //         aria-hidden="false"
    //       >
    //         ❤️
    //       </span>{' '}
    //       add creater here.
    //     </h4>
    //   </div>
    // </footer>
  );
};

export default Footer;
