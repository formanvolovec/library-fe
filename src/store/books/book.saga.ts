import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { IBook } from "../../models/book.interface";
import { deleteBook, editBook, getBook, loadBooks } from "../../common/api/book.api";
import { BookDispatch, BookReducer } from "../../enums";
import { CoreReducer } from "../../enums";

function* loadBookRequest(action: any) {
  try {
    if (action.payload.offset) {
      yield put({ type: BookReducer.SET_OFFSET, payload: action.payload?.offset })
    }
    if (action.payload.title) {
      yield put({ type: BookReducer.SET_TITLE, payload: action.payload?.title })
    }
    const searchParams: Record<string, any> = yield select((state: any) => state.bookReducer.search);
    const books: IBook[] = yield call(loadBooks, searchParams);
    yield put({ type: BookReducer.LOAD, payload: books })
  } catch (e: any) {
    yield put({ type: CoreReducer.ERROR, error: e.message })
    yield put({ type: BookReducer.LOAD, payload: [] })
  }
}

function* getBookById(action: any) {
  try {
    const book: IBook = yield call(getBook, action.payload);
    yield put({ type: BookReducer.GET, payload: book })
  } catch (e: any) {
    yield put({ type: CoreReducer.ERROR, error: e.message })
  }
}

function* deleteBookRequest(action: any) {
  try {
    yield call(deleteBook, action.payload);
    yield put({ type: BookReducer.LOAD })
  } catch (e: any) {
    yield put({ type: CoreReducer.ERROR, error: e.message })
  }
}

function* editBookRequest(action: any) {
  try {
    const book: Record<string, any> = yield call(editBook, action.payload);
    yield put({ type: BookReducer.GET, payload: book })
  } catch (e: any) {
    yield put({ type: CoreReducer.ERROR, error: e.message })
  }
}

export default function* bookSaga() {
  yield takeEvery(BookDispatch.LOAD, loadBookRequest)
  yield takeEvery(BookDispatch.GET, getBookById)
  yield takeEvery(BookDispatch.DELETE, deleteBookRequest)
  yield takeEvery(BookDispatch.UPDATE, editBookRequest)
}
