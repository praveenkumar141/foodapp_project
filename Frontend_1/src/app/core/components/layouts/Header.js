import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../auth/actions/authAction";

export const Header = ({ auth: { user }, isAuthenticated, logout }) => {
  const guestLinks = (
    <ul>
      <li>
        <Link to="/auth/register">Register</Link>
      </li>
      <li>
        <Link to="/auth/login">Login</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/">Welcome {user && user.username}</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/food/add-food">Add Foods</Link>
      </li>
      {/* <li>
        <Link to="/cart">Cart</Link>
      </li>  */}
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="/">
          <i className="fas fa-code" /> Food Delivery App
        </a>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
