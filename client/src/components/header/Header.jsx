import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import {
  UilListUiAlt,
  UilShoppingBag,
  UilTimes,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import axios from "axios"

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
  const [cart] = state.userApi.cart;

  const logoutUser = async () => {
    await axios("/user/logout")
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }

  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)} className="nav_item">
          <Link className="nav_link" to="/create_product">
            Create Product
          </Link>
        </li>
        <li onClick={() => setMenu(!menu)} className="nav_item">
          <Link className="nav_link" to="/category">
            Categories
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li onClick={() => setMenu(!menu)} className="nav_item nav_item-bottom">
        <Link className="btn btn_default" to="/" onClick={logoutUser}>
          Log out
        </Link>
      </li>
    );
  };

  const [menu, setMenu] = useState(false);

  const styleMenu = {
    top: menu ? 0 : "-100%",
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link className="nav_logo" to="/">
          {isAdmin ? "Admin" : "UA Bazar"}
        </Link>

        <div style={styleMenu} className="nav_menu">
          <ul className="nav_list">
            <li onClick={() => setMenu(!menu)} className="nav_item">
              <Link className="nav_link active-link" to="/">
                {isAdmin ? "Products" : "Bazar"}
              </Link>
            </li>
            {isAdmin && adminRouter()}
            {isLogged ? (
              loggedRouter()
            ) : (
              <li
                onClick={() => setMenu(!menu)}
                className="nav_item nav_item-bottom grid"
              >
                <Link className="btn btn_default" to="/login">
                  Login
                </Link>
                <Link className="btn btn_white" to="/register">
                  Register
                </Link>
              </li>
            )}
            <div onClick={() => setMenu(!menu)} className="nav_close">
              <UilTimes className="icon" />
            </div>
          </ul>
        </div>

        <div className="nav_btns">
          {isAdmin ? (
            ""
          ) : (
            <div className="nav_cart">
              <span className="nav_cart-count">{cart.length}</span>
              <Link to="/cart">
                <UilShoppingBag className="icon" />
              </Link>
            </div>
          )}

          <div onClick={() => setMenu(!menu)} className="nav_toggle">
            <UilListUiAlt className="icon" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
