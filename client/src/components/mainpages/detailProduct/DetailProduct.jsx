import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <section className="product_detail section">
      <div className="detail_container container">
        <div className="detail_content">
          <img src={detailProduct.images.url} alt="" className="detail_img" />
          <div className="detail_data">
            <span className="detail_price">${detailProduct.price}</span>
            <h1 className="detail_title">{detailProduct.title}</h1>
            <p className="detail_description">{detailProduct.description}</p>
            <p className="detail_content">{detailProduct.content}</p>
            <p className="detail_sold">Sold: {detailProduct.sold}</p>
            <Link to="/cart" className="btn btn_default detail_cart">
              Buy now
            </Link>
          </div>
        </div>

        <div className="detail_related-products">
          <h1 className="section_title">Related products</h1>
          <div className="product_container grid">
            {products.map((product) => {
              return product.category === detailProduct.category ? (
                <ProductItem key={product._id} product={product} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailProduct;
