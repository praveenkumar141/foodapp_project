import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import AddToCartButton from "./AddToCartButton";

const CartItem = ({
  food: { id, foodName, foodCost },
  index,
  auth: {
    user: { cart },
  },
}) => {
  const countQuantity = (arr, val) =>
    arr.reduce((count, food) => (food.id === val ? count + 1 : count), 0);

  return (
    <tbody>
      <tr>
        <td>{index + 1}</td>
        <td>{foodName}</td>
        <td>₹ {foodCost}</td>
        <td>
          <AddToCartButton foodId={id}></AddToCartButton>
        </td>
        <td>₹ {foodCost * countQuantity(cart, id)}</td>
      </tr>
    </tbody>
  );
};

CartItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
