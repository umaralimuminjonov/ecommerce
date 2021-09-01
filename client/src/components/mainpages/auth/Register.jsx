import React, { useState } from "react";
import { UilUser, UilPadlock } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <section className="register section">
      <div className="register_container container grid">
        <form onSubmit={registerSubmit} className="register_form" id="register">
          <h1 className="form_title">Register</h1>

          <div className="form_box">
            <UilUser className="form_icon" />
            <input
              type="text"
              placeholder="Enter name"
              className="form_input"
              required
              name="name"
              value={user.name}
              onChange={onChangeInput}
            />
          </div>

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
            Register
          </button>

          <div>
            <span class="form_account">Do you have an Account?  </span>
            <Link to="/login" class="form_signin" id="sign-in">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
