import {combineReducers} from "redux";
import bookReducer from "./books/book.reducer";
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({
    authReducer,
    bookReducer
})

export default  rootReducer
