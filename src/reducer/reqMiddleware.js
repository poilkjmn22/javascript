import req from "@/req.js";

const reqMiddleware = (store) => (next) => (action) => {
  if (action.type === "navList") {
    (async () => {
      try {
        store.dispatch({
          type: "navList/search",
          payload: {
            loading: true,
            data: null,
            error: null,
          },
        });
        const res = await req.get("nav-list/list");
        store.dispatch({
          type: "navList/search",
          payload: {
            loading: false,
            error: null,
            data: res.data,
          },
        });
      } catch (err) {
        store.dispatch({
          type: "navList/search",
          payload: {
            loading: false,
            error: err,
            data: [],
          },
        });
      }
    })();
  }
  return next(action);
};
export default reqMiddleware;
