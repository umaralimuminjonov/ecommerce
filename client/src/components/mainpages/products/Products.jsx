import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductsItem from "../utils/productItem/ProductItem"
import Loading from "../utils/loading/Loading"

function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products

  return (
    <section className="products section">
      <h1 className="section_title">Products</h1>

      <div className="products_container container grid">
        {
          products.map(product => <ProductsItem key={product._id} product={product} />)
        }
      </div>
      {products.length === 0 && <Loading />}
    </section>
  );
}

export default Products;
