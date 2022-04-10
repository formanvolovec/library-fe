import {BookDto} from "../../models/book.dto";
import {axios} from "./default-axios.api";
import {prepareAuthHeader} from "./axios.service";


export const loadBooks = async (): Promise<BookDto[]> =>{
    try {
        const response = await axios.get<BookDto[]>('book', prepareAuthHeader())
        return response.data
    } catch (err: any){
        console.log(err)
        return []
    }
}

export const searchBook = async (searchText: string, currentPage: number): Promise <any> => {
    try {
        const updateTopic = await axios.get(`book/search?searchText=${searchText}&page=${currentPage}&itemsPerPage=2`, prepareAuthHeader() )
        return updateTopic.data
    } catch (err: any) {
        console.log(err)
        return []
    }
}

export const getAmountPagesByCriteria = async (searchText: string, currentPage: number) => {
    try{
        const updateTopic = await axios.get(`book/getAmountPagesByCriteria?searchText=${searchText}$pages=${currentPage}$itemsPerPage=5`, prepareAuthHeader())
        return updateTopic.data
    } catch (err: any){
        console.log(err)
}
}
