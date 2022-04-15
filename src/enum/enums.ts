export const enum BookDispatch {
  LOAD = '[Book] dispatch load',
  GET = '[Book] dispatch get',
  SET = 'SET_PAGE',
  UPDATE = 'EDIT_BOOK',
  DELETE =  'DELETE_BOOK',
};

export const enum BookReducer{
  SET = '[Book] Set',
  SET_TITLE = '[Book] Set title',
  SET_LIMIT = '[Book] Set limit',
  SET_OFFSET = '[Book] Set offset',
  LOAD = '[Book] Load',
  GET = '[Book] Get',
  DELETE = '[Book] Delete',
  UPDATE = '[Book] Update',
}

export const enum AuthDispatch{
  SET_LOGIN = 'LOGIN_USER',
  SET_REGISTER = 'REGISTER_USER',
  GET_PROFILE = 'PROFILE'
}

export const enum AuthReducer{
  SET ='[Auth] Set token',
  SET_ERROR = '[Auth] Set fetch error',
  GET = '[Auth] Get profile',
  LOGOUT = '[Auth] Log out',
}
