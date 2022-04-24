import { axios } from "./default-axios.api";
import { prepareHeader } from "./axios.service";
import { IBookAdd } from "../../models/IBookAdd";
import { IBook } from "../../models/IBook";


export const getBook = async (id: any) => {
  try {
    const response = await axios.get(`book/${ id }`, prepareHeader());
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const loadBooks = async (params: any = {}): Promise<IBook[]> => {
  let url = 'book';
  const paramKeys = Object.keys(params).filter(key => params[key] !== undefined);
  if (paramKeys.length) {
    url += '?';
    const lastKey = paramKeys.at(-1);
    paramKeys.forEach((key) => {
      url += `${ key }=${ params[key] }`;
      url += key === lastKey ? '' : '&';
    });
  }
  const response = await axios.get<IBook[]>(url, prepareHeader());
  return response.data;
}

export const addBook = async (data: IBookAdd) => {
  const response = await axios.post(`book/add`,data, prepareHeader({'content-type' : 'multipart/form-data'}))
  return response.data
}

export const editBook = async (book: Partial<IBook> ) => {
  const response = await axios.patch(`book/${ book.id }`, book, prepareHeader())
  return response.data
}

export const deleteBook = async (id: string) => {
  const response = await axios.delete(`book/${ id }`, prepareHeader())
  return response.data
}
