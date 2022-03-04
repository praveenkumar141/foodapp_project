import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayCart from "../../cart/components/DisplayCart";

const CartRouters = () => {
  return (
    <div>
      <Routes>
        <Route path="view-cart" element={<DisplayCart></DisplayCart>}></Route>
      </Routes>
    </div>
  );
};

export default CartRouters;
