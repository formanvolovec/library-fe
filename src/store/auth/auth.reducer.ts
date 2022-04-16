import { AuthReducer } from "../../enums";

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

export interface IAuthAction {
  type: AuthReducer,
  payload: any,
}

export default function authReducer(state: reducerState = initialState, action: IAuthAction): reducerState {
  switch (action.type) {
    case AuthReducer.PROFILE:
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
    default:
      return state;
  }
}
