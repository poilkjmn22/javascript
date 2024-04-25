const initialState = {
  navList: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "navList/search":
      return { ...state, navList: action.payload.data };
    default:
      return { ...state };
  }
}
