import { AuthReducer } from "../../enum/enums";
import { toast } from "react-toastify";

export interface reducerState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: any;
}

const initialState: reducerState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
};

export default function authReducer(state: reducerState = initialState, action: any): reducerState {
  switch (action.type) {
    case AuthReducer.GET:
    case AuthReducer.SET:
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token)
      }
      return {
        ...state,
        isLoggedIn: !!action.payload.user,
        isAdmin: action.payload.user.role === "admin",
        user: action.payload.user
      }
    case AuthReducer.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        ...initialState
      }
    case AuthReducer.SET_ERROR:
      toast.error(action.payload)
      return {
        ...state,
      }
    default:
      return state;
  }
}