import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../../auth/actions/authAction";

const initialstate = {
  username: "",
  email: "",
  password: "",
  password2: "",
  //address: "",
  houseno: "",
  street: "",
  role: [],
};

export const Register = ({ isAuthenticated, register }) => {
  const [state, setState] = useState(initialstate);

  const [errors, setErrors] = useState({});

  const {
    username,
    email,
    password,
    password2,
    address,
    houseno,
    street,
    roleuser,
  } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Hello from register");
    console.log(JSON.stringify(state));

    const houseno = document.getElementById("houseno");
    const street = document.getElementById("street");
    const city = document.getElementById("city");
    const statename = document.getElementById("statename");
    const zipcode = document.getElementById("zipcode");

    var address =
      houseno.value +
      ", " +
      street.value +
      ", " +
      city.value +
      ", " +
      statename.value +
      ", " +
      zipcode.value;

    var role = roleuser.split(",");
    role.forEach((e) => console.log(e));
    if (password !== password2) {
      // We need to inform, passwords are not matching
    } else {
      register({ username, email, password, address, role});
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard"></Navigate>;
  }

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChange}
              required
            />
            <div>{errors.username}</div>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email Address"
              name="email"
              onChange={onChange}
              required
            />
            <div>{errors.email}</div>
          </div>
          <div className="form-group">
            <input
              id="houseno"
              type="text"
              placeholder="House Number"
              name="address"
              onChange={onChange}
              required
            />
            <div>{errors.address}</div>
          </div>
          <div className="form-group">
            <input
              id="street"
              type="text"
              placeholder="Street"
              name="address"
              onChange={onChange}
              required
            />
            <div>{errors.address}</div>
          </div>
          <div className="form-group">
            <input
              id="city"
              type="text"
              placeholder="City"
              name="address"
              onChange={onChange}
              required
            />
            <div>{errors.address}</div>
          </div>
          <div className="form-group">
            <input
              id="statename"
              type="text"
              placeholder="State"
              name="address"
              onChange={onChange}
              required
            />
            <div>{errors.address}</div>
          </div>
          <div className="form-group">
            <input
              id="zipcode"
              type="text"
              placeholder="Zip Code"
              name="address"
              onChange={onChange}
              required
            />
            <div>{errors.address}</div>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              name="password"
              onChange={onChange}
              required
            />
            <div>{errors.password}</div>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirm Password"
              name="password2"
              onChange={onChange}
            />
            <div>{errors.password2}</div>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Role"
              name="roleuser"
              value={roleuser}
              onChange={onChange}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/auth/login">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
