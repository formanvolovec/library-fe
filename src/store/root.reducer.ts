import { combineReducers } from "redux";
import bookReducer from "./books/book.reducer";
import authReducer from "./auth/auth.reducer";
import coreReducer from "./core/core.reducer";

const rootReducer = combineReducers({
  authReducer,
  bookReducer,
  coreReducer
})

export default rootReducer
