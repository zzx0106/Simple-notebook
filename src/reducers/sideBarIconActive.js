import * as actionTypes from "../actionType";
const initialState = {
    vue:false,
    react:false,
    node:false,
    mongoose:false,
    andriod:false
};
const sideBarIconActive = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ICON_ACTIVE:
      return {
        ...state,
        item: action.item
      };
    default:
      return state;
  }
};
export default sideBarIconActive;
