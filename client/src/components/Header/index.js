import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/");
  };
  return (
    <div className="navbar base-100 bg-secondary-focus">
      <div>
        <div className="p-1">
          <b className=" flex-1 text-center circle  w-10 rounded-full text-primary-content">
            &#60;C/Ɔ&#62;
          </b>
        </div>
      </div>
      <div className="flex-1 bg-secondary justify-around rounded p-1 m-1 border border-white">
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
                className="input input-bordered bg-white"
              />
            </div> */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={process.env.PUBLIC_URL + "/dropdown-light.png"} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <Link
                  className="btn btn-md bg-secondary m-2 text-white"
                  to="/home"
                >
                  Home
                </Link>

                <Link
                  className="btn btn-md bg-secondary m-2 text-white"
                  to="/profile/me"
                >
                  Your Profile
                </Link>

                <Link
                  className="btn btn-md bg-secondary m-2 text-white"
                  to="/friends"
                >
                  Friends
                </Link>

                <Link
                  className="btn btn-md bg-secondary m-2 text-white"
                  to="/inprogress"
                >
                  Chat
                </Link>

                <Link
                  className="btn btn-md bg-secondary m-2 text-white"
                  onClick={logout}
                >
                  Logout
                </Link>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-end ">
              <Link to="/signup">
                <div className="btn bg-secondary text-primary-content p-1 m-1">
                  Signup
                </div>
              </Link>
            </div>
            <div className="navbar-end">
              <Link to="/">
                <div className="btn bg-secondary text-primary-content p-1">
                  Login
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
