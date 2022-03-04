import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = ({ auth: { user } }) => {
  if (!user) return <></>;
  const { name, email, address } = user;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-1" />
        <div className="col">
          <div className="mt-3">
            <div className="display-6">
              Thank you for placing the order. Your order will be delivered
              shortly
            </div>
            <div className="mt-3">
              <h3>Delivery address:</h3>
              <hr />
              <div className="lead">Name: {name}</div>
              <div className="lead">Email: {email}</div>
              <div className="lead">Address: {address}</div>
            </div>
          </div>
          <Link className="btn btn-primary mt-3" to="/">
            Back to Home
          </Link>
        </div>
        <div className="col-1" />
      </div>
    </div>
  );
};

Checkout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
