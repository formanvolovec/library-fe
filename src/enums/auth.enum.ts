export const enum AuthSaga {
  LOGIN = 'LOGIN_USER',
  REGISTER = 'REGISTER_USER',
  PROFILE = 'PROFILE'
}

export const enum AuthReducer {
  SET = '[Auth] Set token',
  PROFILE = '[Auth] Get profile',
  LOGOUT = '[Auth] Log out',
}
