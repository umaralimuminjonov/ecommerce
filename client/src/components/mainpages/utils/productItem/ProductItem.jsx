import React from "react";
import ProductLink from "../productLink/ProductLink";

function ProductItem({ product, isAdmin }) {
  return (
    <div className="product_content">
      {isAdmin && <input type="checkbox" className="product_checkbox" checked={product.checked} />}
      <img src={product.images.url} alt="" className="product_img" />
      <span className="product_price">${product.price}</span>
      <h3 className="product_title">{product.title}</h3>
      <p className="product_description">{product.description}</p>
      <ProductLink product={product} />
    </div>
  );
}

export default ProductItem;
