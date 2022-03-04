import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./app/core/components/layouts/Header";
import Alert from "./app/core/components/Alert";
import Landing from "./app/core/components/layouts/Landing";
import Footer from "./app/core/components/layouts/Footer";
import setAuthToken from "./utils/setAuthToken";

// Redux imports
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthRouters } from "./app/auth/routings/AuthRouters";
import { useEffect } from "react";
import { loadUser } from "./app/auth/actions/authAction";
import DashboardRouter from "./app/dashboard/routings/DashboardRouter";
import { FoodRouter } from "./app/food/routings/FoodRouter";

if (localStorage.accessToken) {
  setAuthToken(localStorage.getItem("accessToken"));
  store.dispatch(loadUser(localStorage.getItem("accessToken")));
}
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header></Header>
          <Alert></Alert>
          <Routes>
            <Route path="/" element={<Landing></Landing>}></Route>
            <Route path="/auth/*" element={<AuthRouters></AuthRouters>}></Route>
            <Route
              path="/dashboard/*"
              element={<DashboardRouter></DashboardRouter>}
            ></Route>
            <Route path="/food/*" element={<FoodRouter></FoodRouter>}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
