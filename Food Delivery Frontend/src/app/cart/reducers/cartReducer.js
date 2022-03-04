import {
    CART_ERROR,
    CLEAR_CART,
    UPDATE_CART,
  } from "../../../redux/types/cartTypes";
  
  const initialState = {};
  
  function cartReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case UPDATE_CART:
      case CLEAR_CART:
        return {
          ...state,
        };
  
      case CART_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
  
      default:
        return state;
    }
  }
  
  export default cartReducer;