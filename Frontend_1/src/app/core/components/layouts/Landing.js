import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Food Delivery App</h1>
          <p className="lead">
            Add food details and also retrieve information about different cuisines
          </p>
          <div className="buttons">
            <Link to="/auth/register" className="btn btn-lg btn-info mr-2">
              Sign Up
            </Link>
            <Link to="/auth/login" className="btn btn-lg btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
