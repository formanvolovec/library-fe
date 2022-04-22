import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { IBook } from "../../models/IBook";
import { addBook, deleteBook, editBook, getBook, loadBooks } from "../../common/api/book.api";
import { BookDispatch, BookReducer } from "../../enums";
import { CoreEnum } from "../../enums";

function* loadBookRequest(action: any) {
  try {
    if (action.payload.offset) {
      yield put({type: BookReducer.SET_OFFSET, payload: action.payload?.offset})
    }
    if(action.payload.title){
      yield put({type: BookReducer.SET_OFFSET, payload: 0})
    }
    const searchParams: Record<string, any> = yield select((state: any) => state.bookReducer.search);
    if(searchParams.title !== action.payload.title) {
      yield put({type: BookReducer.SET_TITLE, payload: action.payload?.title || undefined})
    }
    const books: IBook[] = yield call(loadBooks, searchParams);
    yield put({ type: BookReducer.LOAD, payload: books })
  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, error: e.message })
    yield put({ type: BookReducer.LOAD, payload: [] })
  }
}

function* getBookById(action: any) {
  try {
    const book: IBook = yield call(getBook, action.payload);
    yield put({ type: BookReducer.GET, payload: book });
  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, error: e.message.data.message })
  }
}

function* deleteBookRequest(action: any) {
  try {
    yield call(deleteBook, action.payload);
    yield put({ type: BookReducer.LOAD });
  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, error: e.message.data.message })
  }
}

function* editBookRequest(action: any) {
  try {
    const book: Record<string, any> = yield call(editBook, action.payload.data);
    yield put({ type: BookReducer.GET, payload: book })
    yield call(editBook, action.payload)
    yield put({type: BookReducer.UPDATE, payload: book})
    yield call(action.push, `/book/${book.id}`)
  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, error: e.message.data.message })
  }
}

function* addBookRequest(action: any){
  try{
    const book: Record<string, any> = yield call(addBook, action.payload);
    yield put({type: BookReducer.GET, payload: book})
    yield call(action.push, `/book/${book.id}`)
  }catch (e: any){
    yield put({ type: CoreEnum.ERROR, error: e.message.data.message })
  }
}


export default function* bookSaga() {
  yield takeEvery(BookDispatch.LOAD, loadBookRequest)
  yield takeEvery(BookDispatch.GET, getBookById)
  yield takeEvery(BookDispatch.DELETE, deleteBookRequest)
  yield takeEvery(BookDispatch.UPDATE, editBookRequest)
  yield takeEvery(BookDispatch.ADD, addBookRequest)
}
