import React, { useState } from "react";
import { UilUser, UilPadlock } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  return (
    <section className="login section">
      <div className="login_container container grid">
        <form action="" className="login_form" id="log-in">
          <h1 className="form_title">Login</h1>

          <div className="form_box">
            <UilUser className="form_icon" />
            <input
              type="text"
              placeholder="Enter Email"
              className="form_input"
            />
          </div>

          <div className="form_box">
            <UilPadlock className="form_icon" />
            <input
              type="text"
              placeholder="Enter Password"
              className="form_input"
            />
          </div>

          <Link to="/login">Login</Link>

          <div>
            <span class="form_account">Don't have an Account ?</span>
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
