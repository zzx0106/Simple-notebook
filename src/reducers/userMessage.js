import * as actionTypes from "../actionType";
const initialState = {
  message: Object,
  beginFetch: false
};
const userMessage = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_MESSAGE_RESPONSE:
      return Object.assign({}, state, {
        beginFetch: true
      });
    case actionTypes.USER_MESSAGE_RECEIVE:
      return Object.assign({}, state, {
        message: action,
        beginFetch: false
      });
    default:
      return state;
  }
};
export default userMessage;
