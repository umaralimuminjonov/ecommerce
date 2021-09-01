import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function ProductLink({ product }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userApi.isAdmin;
  const addCart = state.userApi.addCart;

  return (
    <div>
      {isAdmin ? (
        <div className="product_links">
          <Link to={`/edit_product/${product._id}`}>
            <p className="product_link product_edit">Edit</p>
          </Link>
          <Link to="#!">
            <p className="product_link product_delete">Delete</p>
          </Link>
        </div>
      ) : (
        <div className="product_links">
          <Link to={`/detail/${product._id}`}>
            <p className="product_link product_view">
              View
            </p>
          </Link>
          <Link to="#!" onClick={() => addCart(product)}>
            <p className="product_link product_buy">Buy now</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductLink;
