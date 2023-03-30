import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
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
          <div className="card w-auto bg-base-100 shadow-xl">
            <figure>
              {/* <img src={logo} alt="Code Collective logo" /> */}
            </figure>
          </div>
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
                        Login
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

export default Login;