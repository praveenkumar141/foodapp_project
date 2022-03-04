import { SET_ALERT, REMOVE_ALERT } from "../../../redux/types/alertTypes";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
};
