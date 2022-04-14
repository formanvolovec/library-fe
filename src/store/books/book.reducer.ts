import { IBook } from "../../models/book.interface";
import { BookDispatch, BookReducer } from "../../enum/enums";

interface reducerState {
    books: IBook[],
    book: IBook | null,
    total: number,
    title: string,
    offset: number,
    limit: number,
}

const initialState: reducerState = {
    books: [],
    book: null,
    total: 0,
    title: '',
    offset: 0,
    limit: 8,
}

export default function bookReducer(state: reducerState = initialState, action: any): reducerState{
    switch (action.type) {
        case BookReducer.GET:
            return {
                ...state,
                book: action.payload
            }
        case BookReducer.LOAD:
            return {
                ...state,
                books: action.payload.items,
                total: action.payload.total,
            }
        case BookReducer.SET_TITLE:
            return {
                ...state,
                title: action.payload,
            }
        case BookReducer.DELETE:
            return {
                ...state,
                book: null
            }
        case BookReducer.UPDATE:
            return {
                ...state,
                book: action.payload
            }
        case BookReducer.SET_LIMIT:
            return {
                ...state,
                limit: action.payload,
            }
        case BookReducer.SET_OFFSET:
            return {
                ...state,
                offset: action.payload,
            }
        default:
            return state
    }
}