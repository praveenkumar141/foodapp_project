import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DisplayFoods from "../../food/components/DisplayFoods";
import { getFoods } from "../../food/actions/foodAction";
import { deleteAccount, loadUser } from "../../auth/actions/authAction";

const foodTypeState = {
  foodType: "",
};

const options = [
  {
    id:1,
    label: "Indian",
    value: "INDIAN",
  },
  {
    id:2,
    label: "Mexican",
    value: "MEXICAN",
  },
  {
    id:3,
    label: "Italian",
    value: "ITALIAN",
  },
];

export const Dashboard = ({
  auth: { user },
  food: { food, foods },
  getFoods,
  deleteAccount,
}) => {
  useEffect(() => {
    getFoods();
  }, [getFoods]);
  //dispatc(loadUser());
  
  const [typeData, setTypeData] = useState(foodTypeState);

  const { foodType } = typeData;

  const handleChange = (e) => {
    //console.log(typeData);
    setTypeData({ ...typeData, [e.target.name]: e.target.value });
    //console.log(foodType);
  };
  //console.log(foodType);
  return (
    <div>
      <section className="container">
        <nav>
          <ul>
            <li>
              <h1 className="large text-primary">Dashboard</h1>
            </li>
            {/* <li></li> */}
            <li>
              <div className="form-group">
                <select
                  name="foodType"
                  default value={foodType}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <option value={option.value} key={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            </li>
          </ul>
        </nav>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.username}
        </p>
        {foods.length > 0 ? (
          <>
            <DisplayFoods fType={foodType}></DisplayFoods>
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
