import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Landing from "../../core/components/layouts/Landing";
import Welcome from "../components/Welcome";
import PrivateRoute from "../../core/routers/PrivateRoute";

export const AuthRouters = () => {
  console.log("Inside the auth Routers");
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/delete" element={<Landing></Landing>}></Route>
        <Route path="/welcome" element={<PrivateRoute component={Welcome}></PrivateRoute>}></Route>
      </Routes>
    </div>
  );
};
