import { createStore, combineReducers, applyMiddleware } from "redux";
import { DISHES } from "./dishes";
import { PROMOTIONS } from "./promotions";
import { COMMENTS } from "./comments";
import { LEADERS } from "./leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: DISHES,
      promotions: PROMOTIONS,
      comments: COMMENTS,
      leaders: LEADERS
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
