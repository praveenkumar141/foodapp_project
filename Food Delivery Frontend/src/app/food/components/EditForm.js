import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateFood } from "../../food/actions/foodAction";

const initialState = {
  foodName: "",
  foodCost: "",
  foodType: "",
  description: "",
  foodPic: "",
};
export const EditForm = ({ food: { food, loading }, updateFood }) => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && food) {
      const foodData = { ...initialState };
      for (const key in food) {
        if (key in foodData) foodData[key] = food[key];
      }
      setFormData(foodData);
    }
  }, [loading, food]);

  const { foodName, foodCost, foodType, description, foodPic } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateFood(formData, navigate, food.id);
  };

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Edit Food Details</h1>
        <p className="lead">
          <i className="fas fa-user" />
          Add some changes to food details
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

EditForm.propTypes = {
  updateFood: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  food: state.food,
});

const mapDispatchToProps = { updateFood };

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
