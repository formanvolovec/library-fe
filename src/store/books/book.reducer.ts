import { IBook } from "../../models/book.interface";

interface reducerState {
    books: IBook[],
    book: IBook | null,
    total: number,
    title: string,
    offset: number,
    limit: number,
    currentPage: number,
}

const initialState: reducerState = {
    books: [],
    book: null,
    total: 0,
    title: '',
    offset: 0,
    limit: 8,
    currentPage: 1,
}

export default function bookReducer(state: reducerState = initialState, action: any): reducerState{
    switch (action.type) {
        case '[Book] Get by id':
            return {
                ...state,
                book: action.payload
            }
        case '[BooksComponent] Set':
            return {
                ...state,
                books: action.payload.items,
                total: action.payload.total,
            }
        case `[Search_Text] Set`:
            return {
                ...state,
                title: action.payload,
            }
        case '[Book] DELETE':
            return {
                ...state,
                book: null
            }
        case '[BOOK] EDIT':
            return {
                ...state,
                book: action.payload
            }
        case '[Page_limit] Set':
            return {
                ...state,
                limit: action.payload,
            }
        case '[Page] Set':
            return {
                ...state,
                offset: action.payload,
            }
        default:
            return state
    }
}