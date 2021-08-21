import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./utils/notFound/NotFound";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />

      <Route path="/cart" exact component={Cart} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  )
};

export default Pages;
