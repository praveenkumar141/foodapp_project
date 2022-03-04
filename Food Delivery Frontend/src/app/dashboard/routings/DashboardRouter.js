import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../core/routers/PrivateRoute";
import Dashboard from "../components/Dashboard";

const DashboardRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          //element={<PrivateRoute component={Dashboard} />}
          element = {<Dashboard></Dashboard>}
        ></Route>
      </Routes>
    </div>
  );
};

export default DashboardRouter;
