import { spawn } from 'redux-saga/effects'
import bookSaga from "./books/book.saga";
import authSaga from './auth/auth.saga';

export default function * rootSaga () {
    yield spawn(authSaga)
    yield spawn(bookSaga)
}
