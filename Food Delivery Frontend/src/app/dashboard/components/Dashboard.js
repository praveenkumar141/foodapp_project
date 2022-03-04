import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DisplayFoods from "../../food/components/DisplayFoods";
import { getFoods } from "../../food/actions/foodAction";
import { deleteAccount, loadUser } from "../../auth/actions/authAction";

// const foodTypeState = {
//   foodType: "",
// };

// const options = [
//   {
//     id: 1,
//     label: "Indian",
//     value: "INDIAN",
//   },
//   {
//     id: 2,
//     label: "Mexican",
//     value: "MEXICAN",
//   },
//   {
//     id: 3,
//     label: "Italian",
//     value: "ITALIAN",
//   },
// ];

export const Dashboard = ({
  auth: { user },
  food: { foods },
  getFoods,
  deleteAccount,
  getFoodByType,
}) => {
  const [foodType, setFoodType] = useState();

  useEffect(() => {
    switch (foodType) {
      case "INDIAN":
      case "CHINESE":
      case "ITALIAN":
      case "MEXICAN":
        getFoodByType(foodType);
        break;

      default:
        getFoods();
        break;
    }
  }, [getFoods, getFoodByType, foodType]);

  const onChange = (e) => {
    setFoodType({ ...foodType, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">
            <select
              name="foodType"
              value={foodType}
              onChange={onChange}
              className="form-select"
            >
              <option defaultValue>All</option>
              <option value="INDIAN">Indian</option>
              <option value="MEXICAN">Mexican</option>
              <option value="ITALIAN">Italian</option>
              <option value="CHINESE">Chinese</option>
            </select>
          </div>
        </div>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.username}
        </p>
        {foods.length > 0 ? (
          <>
            <DisplayFoods foodList={foods}></DisplayFoods>
            <div className="my-2">
              <Link
                to="/auth/delete"
                onClick={(e) => deleteAccount(user.id, e)}
                className="btn btn-danger"
              >
                Delete
              </Link>
            </div>
          </>
        ) : (
          <>
            <p>There are no food items to display, please add some details</p>
            <Link to="/food/add-food" className="btn btn-primary my-1">
              Add Food
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  food: PropTypes.object.isRequired,
  getFoods: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  food: state.food,
});

const mapDispatchToProps = { getFoods, deleteAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
