import {BookDto} from "../../models/book.dto";

interface reducerState {
    books: BookDto[],
    total: number,
    searchText: string,
    currentPage: number,
    pageAmount: number
}

const initialState: reducerState = {
    books: [],
    total: 0,
    searchText: '',
    currentPage: 1,
    pageAmount: 1,
}

export default function bookReducer(state: reducerState = initialState, action: any): reducerState{
    switch (action.type){
        case '[BooksComponent] Set':
            return {
                ...state,
                books: action.payload.items,
                total: action.payload.total,
            }
        case `[Search_Text] Set`:
            return {
                ...state,
                searchText: action.payload,
            }
        case `[Page] Set`:
            return {
                ...state,
                currentPage: action.payload,
            }
        case `[Page_Amount] Set`:
            return {
                ...state,
                pageAmount: action.payload,
            }
        default:
            return state
    }
}