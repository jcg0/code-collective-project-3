import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/login");
  };
  return (
    <div className="navbar base-100 bg-secondary-focus">
      <div>
        <b className=" flex-1 text-center circle  w-10 rounded-full text-primary-content">&#60;C/Ɔ&#62;</b>
      </div>
      <div className="flex-1 bg-secondary-content justify-around ">
        <p>
          
          <b className=" text-primary-content">CODE COLLECTIVE</b>
        </p>
      </div>
      <div className="flex-none gap-2">
        {Auth.loggedIn() ? (
          <>
            {/* <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered"
              />
            </div> */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={process.env.PUBLIC_URL + '/dropdown.png'} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <Link to= "/">Home</Link>

                <Link to="/profile/me">Your Profile</Link>
               
                <Link to="/friends">Friends</Link>
                <li>
                  <a>Chat</a>
                </li>
                <Link className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </Link>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-end">
              <Link to="/signup">
                <div className="btn">Signup</div>
              </Link>
            </div>
            <div className="navbar-end">
              <Link to="/login">
                <div className="btn">Login</div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
