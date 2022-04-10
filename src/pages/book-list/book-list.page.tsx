import React, {useEffect} from 'react';
import {Button, Pagination, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {BookDto} from "../../models/book.dto";
import {BooksComponent} from "../../components/books.component";
import './book-list.page.scss'
import {LogoutComponent} from "../../components/logout.component";

const BookListPage = () => {
    const bookList: BookDto[] =useSelector((state:any) => state.bookReducer.books);
    const pageAmount = useSelector((state: any) => state.bookReducer.pageAmount);
    const currentPage = useSelector((state: any) => state.bookReducer.currentPage);
    const total: BookDto[] = useSelector((state:any) => state.bookReducer.total);
    const dispatch = useDispatch();

    const loadBooks = () =>{
        dispatch({
            type: 'LOAD_BOOKS'
        })
    }
    useEffect(() => loadBooks(), [])

    const onChangePage = async (e: any, value: number) => {
        dispatch({
            type: 'SET_PAGE',
            payload: value
        })
    }

    const changeSearch = (e: any) => {
        dispatch({
            type: '[Search_Text] Set',
            payload: e.target.value
        })
    }

    const onSearch = async () => {
        dispatch({
            type: 'LOAD_BOOKS'
        })
    }

    return (

        <div className='book-list-page'>
            <LogoutComponent/>
            <div className='navbar'>
            <TextField
                onChange={changeSearch}
                className = 'searchField'
                id="standard-basic"
                label="Search"
                variant="standard"
            />
            <Button onClick={onSearch} variant='contained' className="Button" type='submit'>Search</Button>
            </div>
            <div className='book-list'>
                <div>
                    {bookList.map(b => <BooksComponent book={b}></BooksComponent>) }
                    <Pagination page={currentPage} count={pageAmount} onChange={onChangePage}/>
                </div>
            </div>
        </div>
    );
};

export default BookListPage;
