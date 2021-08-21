import React from "react";
import { Link } from "react-router-dom";
import { UilArrowRight } from "@iconscout/react-unicons";

function ProductItem({ product }) {
  return (
    <Link to={`/detail/${product._id}`}>
      <div className="product_content">
        <img src={product.images.url} alt="" className="product_img" />
        <span className="product_price">${product.price}</span>
        <h3 className="product_title">{product.title}</h3>
        <p className="product_description">{product.description}</p>
        <p className="product_link">View <UilArrowRight /></p>
      </div>
    </Link>
  );
}

export default ProductItem;
