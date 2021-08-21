import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import {
  UilListUiAlt,
  UilShoppingBag,
  UilTimes,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const Header = () => {
  const value = useContext(GlobalState);
  const [menu, setMenu] = useState(false);

  const styleMenu = {
    top: menu ? 0 : "-100%",
  };
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link className="nav_logo" to="/">
          Ecommerce
        </Link>

        <div style={styleMenu} className="nav_menu">
          <ul className="nav_list">
            <li onClick={() => setMenu(!menu)} className="nav_item">
              <Link className="nav_link active-link" to="/">
                Home
              </Link>
            </li>
            <li onClick={() => setMenu(!menu)} className="nav_item">
              <Link className="nav_link" to="/products">
                Products
              </Link>
            </li>
            <li onClick={() => setMenu(!menu)} className="nav_item nav_item-bottom grid">
              <Link className="btn btn_default" to="/login">
                Login
              </Link>
              <Link className="btn btn_white" to="/register">
                Register
              </Link>
            </li>
            <div onClick={() => setMenu(!menu)} className="nav_close">
              <UilTimes className="icon" />
            </div>
          </ul>
        </div>

        <div className="nav_btns">
          <div className="nav_cart">
            <span className="nav_cart-count">0</span>
            <Link to="/cart">
              <UilShoppingBag className="icon" />
            </Link>
          </div>
          <div onClick={() => setMenu(!menu)} className="nav_toggle">
            <UilListUiAlt className="icon" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
