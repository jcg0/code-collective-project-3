import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";
const logo = require("../assets/images/CodeCollectiveVertical.png");

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">Code Collective</h1>
            <p className="py-6">
              A great way to keep in touch with your fellow bootcamp student!
            </p>
          </div>
          {/* <div className="card w-auto bg-base-100 shadow-xl">
            <figure>
              {/* <img src={logo} alt="Code Collective logo" />
            </figure>
          </div> */}
          <div className="card flex-shrink-0 w-auto max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="card-body">
                {data ? (
                  <p>
                    Success! You may now head{" "}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form onSubmit={handleFormSubmit} className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      className="input input-bordered"
                      placeholder="Your username"
                      name="username"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                    />
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      className="input input-bordered"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      className="input input-bordered"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <div className="form-control mt-6">
                      <button
                        className="btn btn-primary"
                        style={{ cursor: "pointer" }}
                        type="submit"
                      >
                        Signup
                      </button>
                    </div>
                  </form>
                )}

                {error && (
                  <div className="my-3 p-3 btn btn-error">invalid creds</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
