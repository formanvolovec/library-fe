export const enum BookDispatch {
  LOAD = 'LOAD_BOOKS',
  GET = 'GET_BOOK',
  UPDATE = 'EDIT_BOOK',
  DELETE = 'DELETE_BOOK',
};

export const enum BookReducer {
  SET = '[Book] Set',
  SET_TITLE = '[Book] Set title',
  SET_LIMIT = '[Book] Set limit',
  SET_OFFSET = '[Book] Set offset',
  LOAD = '[Book] Load',
  GET = '[Book] Get',
  DELETE = '[Book] Delete',
  UPDATE = '[Book] Update',
}
