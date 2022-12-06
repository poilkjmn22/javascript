import request from "./request";
const initialState = {
  navList: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "navList/loaded": {
      return { navList: action.payload };
    }
    default:
      return state;
  }
}
// Thunk 函数
export async function fetchNavList(dispatch, getState) {
  const res = await request.get("nav-list/list");
  dispatch({ type: "navList/loaded", payload: res.data });
}
