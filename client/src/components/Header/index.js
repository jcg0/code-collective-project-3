import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="navbar base-100 bg-primary">
      <div className="flex-1">
        <p>
          <b>CC</b>
        </p>
      </div>
      <div className="flex-none gap-2">
        {Auth.loggedIn() ? (
          <>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered"
              />
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Home</a>
                </li>
                <Link to="/me">your profile</Link>
                <li>
                  <a>Friends</a>
                </li>
                <li>
                  <a>Chat</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
                {/* <li>
                  <a>Logout</a>
                </li> */}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-end">
              <Link to="/signup">
                <a className="btn">signup</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
