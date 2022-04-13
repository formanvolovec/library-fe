import { IBook } from "../../models/book.interface";
import { axios } from "./default-axios.api";
import { prepareAuthHeader } from "./axios.service";
import { IBookEdit } from "../../models/edit-book";


export const getBook = async (id: any) => {
    try {
        const response = await axios.get(`book/${id}`, prepareAuthHeader());
        return response.data;
    } catch (e: any) {
        console.log(e);
        return null;
    }
}
export const loadBooks = async (params: any = {}): Promise<IBook[]> => {
    try {
        let url = 'book';
        const paramKeys = Object.keys(params);
        if (paramKeys.length) {
            url += '?';
            const lastKey = paramKeys[-1];
            paramKeys.forEach((key) => {
                url += `${key}=${params[key]}`;
                url += key === lastKey ? '' : '&';
            });
        }
        const response = await axios.get<IBook[]>(url, prepareAuthHeader());
        return response.data;
    } catch (err: any) {
        console.log(err)
        return []
    }
}
export const deleteBook = async (id: string) => {
    try{
        const response = await axios.delete(`book/${id}`, prepareAuthHeader())
        return response.data.json({message: 'Successfully deleted product '})
    } catch (err: any) {
        console.log(err.json({message: err}))
    }
}
export const editBook = async (id: number, title: string, authorName: string,genre: string,date: string,description: string ) => {
    try {
        const iBookEdit: IBookEdit = {
            id, title, authorName, genre, date, description
        }
        const updateTopic = await axios.patch(`book/id/edit`,iBookEdit, prepareAuthHeader() )
        return updateTopic.data
    } catch (err: any) {
        console.log(err)
    }
}
