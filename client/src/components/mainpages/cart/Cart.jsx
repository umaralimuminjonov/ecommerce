import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { UilTimes } from "@iconscout/react-unicons";

function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userApi.cart;

  if (cart.length === 0) return <h2>Savat bo'sh</h2>;
  return (
    <section className="section cart">
      <div className="cart_container">
        {cart.map((product) => {
          <div className="cart_content grid">
            <img src={product.images.url} alt="" className="cart_img" />
            <div className="cart_data">
              <h1 className="cart_title">{product.title}</h1>
              <h3 className="cart_price">
                ${product.price * product.quantity}
              </h3>
              <p className="cart_description">{product.description}</p>
              <p className="cart_content">{product.content}</p>

              <div className="cart_amount">
                <button className="btn cart_btn">-</button>
                <span className="cart_quantity">{product.quantity}</span>
                <button className="btn cart_btn">+</button>
              </div>

              <div className="cart_remove">
                <UilTimes />
              </div>
            </div>
          </div>;
        })}
      </div>
    </section>
  );
}

export default Cart;
