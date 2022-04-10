import {call, put, takeEvery} from "@redux-saga/core/effects";
import {BookDto} from "../../models/book.dto";
import {getAmountPagesByCriteria, loadBooks, searchBook} from "../../common/api/book.api";
import {select} from 'redux-saga/effects'

function* loadBookRequest(){
    try {
        const books: BookDto[] = yield call(loadBooks);
        yield put({type: '[BooksComponent] Set', payload: books })

    } catch (e: any) {
        yield put({type: 'GET_BOOKS_ERROR', message: e.message})
    }
}

function* amountPage(action: any){
    try{
        let page: number | undefined;

        if(action.payload){
            page = action.payload.page;
            const currentPageFromReducer: number =  yield select((state: any) => state.todoReducer.currentPage);
            const currentPage = page || currentPageFromReducer;
        }
    }
}

/*
            const searchText: string = yield select((state: any) => state.bookReducer.searchText);
            const currentPageFromReducer: number =  yield select((state: any) => state.bookReducer.currentPage);
            const currentPage = page || currentPageFromReducer;
            const search: BookDto[] = yield call(searchBook, searchText, currentPage);
            const amountAvailablePage: number = yield call(getAmountPagesByCriteria, searchText, currentPage);
            yield put({type: `[Search] Set`, payload: search})
            yield put({type: '[Page_Amount] Set', payload: amountAvailablePage})

            if(currentPage > amountAvailablePage) {
                yield put({type: '[Page] Set', payload: amountAvailablePage})

            }

        }
    }
*/


function* setPage(action: any) {
    try {
        yield put({type: 'LOAD_BOOKS', payload: {page: action.payload}})
    } catch (e: any) {

    }
}

export default function* bookSaga() {
    yield takeEvery('LOAD_BOOKS', loadBookRequest)
    yield takeEvery('SET_PAGE', setPage)
}