import React, { useState } from "react";
import { UilUser, UilPadlock } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <section className="login section">
      <div className="login_container container grid">
        <form onSubmit={loginSubmit} className="login_form" id="log-in">
          <h1 className="form_title">Login</h1>

          <div className="form_box">
            <UilUser className="form_icon" />
            <input
              type="email"
              placeholder="Enter Email"
              className="form_input"
              required
              name="email"
              value={user.email}
              onChange={onChangeInput}
            />
          </div>

          <div className="form_box">
            <UilPadlock className="form_icon" />
            <input
              type="password"
              placeholder="Enter Password"
              className="form_input"
              required
              name="password"
              value={user.password}
              onChange={onChangeInput}
            />
          </div>

          <button className="btn btn_default form_btn" type="submit">
            Login
          </button>

          <div>
            <span class="form_account">Don't have an Account?  </span>
            <Link to="/register" class="form_signin" id="sign-up">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
