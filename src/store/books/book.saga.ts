import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { IBook } from "../../models/book.interface";
import { deleteBook, editBook, getBook, loadBooks } from "../../common/api/book.api";
import { BookDispatch, BookReducer } from "../../enum/enums";

function* loadBookRequest(action: any) {
    try {
        const offset: number = yield select((state: any) => state.bookReducer.offset);
        const limit: number = yield select((state: any) => state.bookReducer.limit);
        const books: IBook[] = yield call(loadBooks, {...action.payload, offset, limit});
        yield put({type: BookReducer.SET_TITLE, payload: action.payload?.title})
        yield put({type: BookReducer.LOAD, payload: books})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* getBookById(action: any) {
    try {
        const book: IBook = yield call(getBook, action.payload);
        yield put({type: BookReducer.GET, payload: book})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* deleteBookRequest(action: any) {
    try {
        yield call(deleteBook, action.payload);
        yield put({type: BookReducer.LOAD})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* editBookRequest(action: any) {
    try {
        yield call(editBook, action.payload.id, action.payload.title, action.payload.authorName, action.payload.genre, action.payload.date, action.payload.desc);
        yield put({type: BookReducer.LOAD})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* setPage(action: any) {
    try {
        yield put({type: BookReducer.SET_OFFSET, payload: action.payload})
        yield put({type: BookDispatch.LOAD})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

export default function* bookSaga() {
    yield takeEvery(BookDispatch.LOAD, loadBookRequest)
    yield takeEvery(BookDispatch.SET, setPage)
    yield takeEvery(BookDispatch.GET, getBookById)
    yield takeEvery(BookDispatch.DELETE, deleteBookRequest)
    yield takeEvery(BookDispatch.UPDATE, editBookRequest)
}