import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Welcome = (props) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Food Delivery App</h1>
          <p className="lead">
            Welcome, get food details here
          </p>
          <div className="buttons">
            <a href="/dashboard/" className="btn btn-lg btn-light">
              View
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

Welcome.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
