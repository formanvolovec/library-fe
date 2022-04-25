import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { IBook } from "../../models/IBook";
import { addBook, deleteBook, editBook, getBook, loadBooks } from "../../common/api/book.api";
import { BookSaga, BookReducer, CoreEnum, RouteEnum } from "../../shared/enums";
import { getErrorMessage } from "../../shared/utils";
import { ISagaAction } from "../saga-action.type";

function* loadBookRequest(action: ISagaAction) {
  try {
    if (action.payload.offset) {
      yield put({type: BookReducer.SET_OFFSET, payload: action.payload?.offset})
    }
    if (action.payload.title) {
      yield put({type: BookReducer.SET_OFFSET, payload: 0})
    }
    const { title }: Record<string, any> = yield select((state: any) => state.bookReducer.search);
    if (title !== action.payload.title) {
      yield put({type: BookReducer.SET_TITLE, payload: action.payload?.title || undefined})
    }
    const searchParams: Record<string, any> = yield select((state: any) => state.bookReducer.search);
    const books: IBook[] = yield call(loadBooks, searchParams);
    yield put({type: BookReducer.LOAD, payload: books})
  } catch (e: any) {
    yield put({type: BookReducer.LOAD, payload: []})
    yield put({type: CoreEnum.ERROR, error: getErrorMessage(e)})
  }
}

function* getBookById(action: ISagaAction) {
  try {
    const book: IBook = yield call(getBook, action.payload);
    yield put({type: BookReducer.GET, payload: book});
  } catch (e: any) {
    yield put({type: CoreEnum.ERROR, error: getErrorMessage(e)})
  }
}

function* deleteBookRequest(action: ISagaAction) {
  try {
    yield call(deleteBook, action.payload);
    yield call(action.push, RouteEnum.BOOKLIST)
    yield put({type: CoreEnum.INFO, payload: 'Book removed'})
  } catch (e: any) {
    yield put({type: CoreEnum.ERROR, error: getErrorMessage(e)})
  }
}

function* editBookRequest(action: ISagaAction) {
  try {
    const book: Record<string, any> = yield call(editBook, action.payload);
    yield put({type: BookReducer.UPDATE, payload: book})
    yield put({type: CoreEnum.INFO, payload: 'Changes saved'})
    yield call(action.push, `${RouteEnum.BOOK}/${book.id}`)
  } catch (e: any) {
    yield put({type: CoreEnum.ERROR, error: getErrorMessage(e)})
  }
}

function* addBookRequest(action: ISagaAction) {
  try {
    const book: Record<string, any> = yield call(addBook, action.payload);
    yield put({type: BookReducer.GET, payload: book})
    yield call(action.push, `${RouteEnum.BOOK}/${book.id}`)
    yield put({type: CoreEnum.INFO, payload: 'Book add'})
  } catch (e: any) {
    yield put({type: CoreEnum.ERROR, error: getErrorMessage(e)})
  }
}


export default function* bookSaga() {
  yield takeEvery(BookSaga.LOAD, loadBookRequest)
  yield takeEvery(BookSaga.GET, getBookById)
  yield takeEvery(BookSaga.DELETE, deleteBookRequest)
  yield takeEvery(BookSaga.UPDATE, editBookRequest)
  yield takeEvery(BookSaga.ADD, addBookRequest)
}
