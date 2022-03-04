import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddToCartButton from "../../cart/components/AddToCartButton";

export const FoodItem = ({
  food: { id, foodCost, foodName, foodType, description, foodPic },
  auth: { user, isAuthenticated },
}) => {
  return (
    <div className="profile bg-light">
      <img src={foodPic} alt="" className="square-img" />
      <div>
        <h2>{foodName} </h2>
        <Link to={`/food/${id}`} className="btn btn-primary">
          View Food
        </Link>
        
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  food: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  food: state.food,
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FoodItem);
