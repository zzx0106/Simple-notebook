import * as actionTypes from "../actionType";
const initialState = {
  language: "",
  isFetching: false,
  isFetched: false,
  content: Object
};
const contentCommunity = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONTENT_TEXT_RESPONSE:
      return Object.assign({}, state, {
        language: action.language,
        isFetching: true,
        isFetched: false
      });
    case actionTypes.CONTENT_TEXT_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        content: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};
export default contentCommunity;
