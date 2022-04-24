import { IBook } from "../../models/IBook";
import { BookReducer } from "../../enums"

interface reducerState {
  books: IBook[],
  book: IBook | null,
  total: number,
  isLoadingNewItems: boolean
  search: {
    title: string | undefined,
    offset: number,
    limit: number,
  }
}

const initialState: reducerState = {
  books: [],
  book: null,
  total: 0,
  isLoadingNewItems: false,
  search: {
    title: undefined,
    offset: 0,
    limit: 8,
  }
}

export default function bookReducer(state: reducerState = initialState, action: any): reducerState {
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
        search: {
          ...state.search,
          title: action.payload,
        }
      }
    case BookReducer.CLEAR_TITLE:
      return {
        ...state,
        search: {
          ...state.search,
          title: undefined
        }
      }
    case BookReducer.DELETE:
      return {
        ...state,
        book: null
      }
    case BookReducer.UPDATE:
      return {
        ...state,
        isLoadingNewItems: action.payload,
        book: action.payload
      }
    case BookReducer.SET_LIMIT:
      return {
        ...state,
        search: {
          ...state.search,
          limit: action.payload,
        }
      }
    case BookReducer.SET_OFFSET:
      return {
        ...state,
        search: {
          ...state.search,
          offset: action.payload,
        }
      }
    default:
      return state
  }
}
