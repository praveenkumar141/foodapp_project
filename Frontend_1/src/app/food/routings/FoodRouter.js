import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayFoodById from "../components/DisplayFoodById";
import DisplayFoodByType from "../components/DisplayFoodByType";
import EditForm from "../components/EditForm";
import FoodForm from "../components/FoodForm";

export const FoodRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/add-food" element={<FoodForm></FoodForm>}></Route>
        <Route path="/edit-food" element={<EditForm></EditForm>}></Route>
        <Route
          path="/:id"
          element={<DisplayFoodById></DisplayFoodById>}
        ></Route>
        <Route path="/:type" element={<DisplayFoodByType></DisplayFoodByType>}></Route>
      </Routes>
    </div>
  );
};
