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
    <div className="navbar base-100 bg-secondary">
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
                className="input input-bordered bg-white"
              />
            </div>
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
                <Link to= "/home">Home</Link>

                <Link to="/profile/me">Your Profile</Link>
               
                <Link to="/friends">Friends</Link>
                
                <Link to='/inprogress'>Chat</Link>
                
                <Link className="btn btn-md btn-light m-2" onClick={logout}>
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
