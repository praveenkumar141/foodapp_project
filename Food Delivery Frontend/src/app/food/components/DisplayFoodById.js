import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFoodById, deleteFood } from "../actions/foodAction";

export const DisplayFoodbyId = ({
  getFoodById,
  deleteFood,
  food: { food },
}) => {
  const { id } = useParams();

  useEffect(() => {
    getFoodById(id);
  }, [getFoodById]);

  return (
    <section className="container">
      <Link to="/dashboard" className="btn btn-light">
        Back To Foods
      </Link>

      <div className="profile bg-light">
        <img className="round-img my-1" src={food && food.foodPic} alt="" />
        <div>
          <h2 className="my-1">{food && food.foodName}</h2>
          <h2 className="my-1">{food && <span> Rs. {food.foodCost}</span>}</h2>
          <h3 className="my-1">{food && <span> {food.description}</span>}</h3>
          <h3 className="my-1">
            {food && <span> Food Type: {food.foodType}</span>}
          </h3>
          <Link
            className="btn btn-primary"
            onClick={(e) => deleteFood(id, e)}
            to="/dashboard"
          >
            Delete Food
          </Link>
          <Link
            className="btn btn-primary"
            // onClick={(e) => deleteFood(id, e)}
            to="/food/edit-food"
          >
            Edit Food
          </Link>
        </div>
      </div>
    </section>
  );
};

DisplayFoodbyId.propTypes = {
  food: PropTypes.object.isRequired,
  getFoodById: PropTypes.func.isRequired,
  deleteFood: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  food: state.food,
});

const mapDispatchToProps = { getFoodById, deleteFood };

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFoodbyId);
