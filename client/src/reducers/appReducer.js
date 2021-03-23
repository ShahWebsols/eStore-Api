import { SET_SIDEBARFULL } from "../actions/types";
const initialState = {
  sidebarFull: true,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBARFULL:
      return {
        ...state,
        sidebarFull: !state.sidebarFull,
      };
    default:
      return state;
  }
};
export default appReducer;
