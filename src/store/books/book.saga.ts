import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { IBook } from "../../models/book.interface";
import { deleteBook, editBook, getBook, loadBooks } from "../../common/api/book.api";

function* loadBookRequest(action: any) {
    try {
        const offset: number = yield select((state: any) => state.bookReducer.offset);
        const limit: number = yield select((state: any) => state.bookReducer.limit);
        const books: IBook[] = yield call(loadBooks, {...action.payload, offset, limit});
        yield put({type: '[Search_Text] Set', payload: action.payload?.title})
        yield put({type: '[BooksComponent] Set', payload: books})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* getBookById(action: any) {
    try {
        const book: IBook = yield call(getBook, action.payload);
        yield put({type: '[Book] Get by id', payload: book})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* deleteBookRequest(action: any) {
    try {
        yield call(deleteBook, action.payload);
        yield put({type: 'LOAD_BOOKS'})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* editBookRequest(action: any) {
    try {
        yield call(editBook, action.payload.id, action.payload.title, action.payload.authorName, action.payload.genre, action.payload.date, action.payload.desc);
        yield put({type: 'LOAD_BOOKS'})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* setPage(action: any) {
    try {
        yield put({type: '[Page] Set', payload: action.payload})
        yield put({type: 'LOAD_BOOKS'})
    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

export default function* bookSaga() {
    yield takeEvery('LOAD_BOOKS', loadBookRequest)
    yield takeEvery('SET_PAGE', setPage)
    yield takeEvery('GET_BY_ID', getBookById)
    yield takeEvery('DELETE_BOOK', deleteBookRequest)
    yield takeEvery('EDIT_BOOK', editBookRequest)
}