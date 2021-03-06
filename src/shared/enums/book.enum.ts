export const enum BookSaga {
  LOAD = 'LOAD_BOOKS',
  GET = 'GET_BOOK',
  UPDATE = 'EDIT_BOOK',
  DELETE = 'DELETE_BOOK',
  ADD = 'ADD_BOOK'
};

export const enum BookReducer {
  SET_TITLE = '[Book] Set title',
  SET_LIMIT = '[Book] Set limit',
  SET_OFFSET = '[Book] Set offset',
  LOAD = '[Book] Load',
  GET = '[Book] Get',
  DELETE = '[Book] Delete',
  UPDATE = '[Book] Update',
  CLEAR_TITLE = '[Book] Clear title'
}
