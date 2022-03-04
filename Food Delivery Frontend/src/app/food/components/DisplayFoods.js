import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import paginate from "../../../Paginate";
import { getFoods, getFoodByType } from "../actions/foodAction";
import FoodItem from "./FoodItem";

export const DisplayFoods = ({
  //food: { foods },
  foodList,
}) => {
  useEffect(() => {
    getFoods();
  }, [getFoods]);

  return (
    <section>
      <br></br>
      <h1 className="large text-primary">Popular Curations</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>Enjoy your favourite food
      </p>
      <div className="foods">
        {foodList.length > 0 ? (
          foodList.map((food) => (
            <FoodItem key={food.id} food={food}></FoodItem>
          ))
        ) : (
          <h4>No Foods found...</h4>
        )}
      </div>
    </section>
  );
};

DisplayFoods.propTypes = {};

const mapStateToProps = (state) => ({
  //food: state.food,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFoods);
