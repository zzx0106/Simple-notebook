import * as actionTypes from "../actionType";
const initialState = {
  language: "",
  isFetching: false,
  didInvalidate: false,
  items: []
};
const chooseLanguage = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_GETS:
      return Object.assign({}, state, {
        language: action.language,
        isFetching: true,
        didInvalidate: false
      });
    case actionTypes.RECEIVE_GETS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};
export default chooseLanguage;
