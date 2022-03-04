import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { addFood, getFoodById } from "../../food/actions/foodAction";

const initialState = {
  foodName: "",
  foodCost: "",
  foodType: "",
  description: "",
  foodPic: "",
};
export const FoodForm = ({ food: { food, loading }, addFood }) => {
  const [formData, setFormData] = useState(initialState);

  //const addingFood = useMatch("/food/add-food");

  const navigate = useNavigate();

  // for (const key in food) {
  //   console.log(key, food[key]);
  // }

  // useEffect(() => {
  //   //if (!food) getFoodById(id);

  //   if (!loading && food) {
  //     const foodData = { ...initialState };
  //     for (const key in food) {
  //       if (key in foodData) foodData[key] = food[key];
  //     }
  //     setFormData(foodData);
  //   }
  // }, [loading, food]);

  const { foodName, foodCost, foodType, description, foodPic } = formData;
  //console.log(food && food.id)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addFood(formData, navigate);
  };

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Add Food Details</h1>
        <p className="lead">
          <i className="fas fa-user" />
          Let's get some information to add food details
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Food Name"
              name="foodName"
              value={foodName}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Food Cost"
              name="foodCost"
              value={foodCost}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Food Type"
              name="foodType"
              value={foodType}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control form-control-lg"
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Food Image"
              name="foodPic"
              value={foodPic}
              onChange={onChange}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

FoodForm.propTypes = {
  addFood: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  food: state.food,
});

const mapDispatchToProps = { addFood, getFoodById };

export default connect(mapStateToProps, mapDispatchToProps)(FoodForm);
