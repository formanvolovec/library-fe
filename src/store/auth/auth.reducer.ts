import { AuthReducer } from "../../enum/enums";

export interface reducerState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: any;
  isFetchError: boolean;
}

const initialState: reducerState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  isFetchError: false
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
    case '[Auth] Log out':
      localStorage.removeItem('token');
      return {
        ...state,
        ...initialState
      }
    case '[Auth] Set fetch error':
      return {
        ...state,
        isFetchError: action.payload
      }
    default:
      return state;
  }
}