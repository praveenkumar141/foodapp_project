import {
    CLEAR_FOOD,
  FOOD_ERROR,
  GET_FOOD,
  GET_FOODS,
  UPDATE_FOOD,
} from "../../../redux/types/foodTypes";

const initialState = {
  food: null,
  foods: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FOOD:
    case UPDATE_FOOD:
      return {
        ...state,
        food: payload,
        loading: false,
      };
    case GET_FOODS:
      return {
        ...state,
        foods: payload,
        loading: false,
      };
    case FOOD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        food: null,
      };
    case CLEAR_FOOD:
      return {
        ...state,
        food: null,
        repos: [],
      };
    default:
      return state;
  }
};
