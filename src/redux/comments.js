import { Comments } from "../shared/comments";
import * as ActionTypes from "./ActionsTypes";

export const COMMENTS = (state = Comments, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      return state.concat(comment);
    default:
      return state;
  }
};