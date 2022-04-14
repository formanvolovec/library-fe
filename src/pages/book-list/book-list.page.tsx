import React, {useEffect} from 'react';
import { Grid, Pagination } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {IBook} from "../../models/book.interface";
import { BookPreview } from "./components/BookPreview"
import { BookDispatch, BookReducer } from "../../enum/enums";

const BookListPage = () => {
    const bookList: IBook[] = useSelector((state:any) => state.bookReducer.books);
    const limit = useSelector((state:any) => state.bookReducer.limit);
    const total = useSelector((state:any) => state.bookReducer.total);
    const offset = useSelector((state:any) => state.bookReducer.offset);
    const dispatch = useDispatch();
    const loadBooks = () =>{
        dispatch({
            type: BookDispatch.LOAD,
            payload:{ limit, offset}
        })
    }
    useEffect(() => loadBooks(), [])

    const onChangePage = async (e: any, value: number) => {
        dispatch({
            type: BookDispatch.SET,
            payload: value
        })
    }

    const pageCount = Math.ceil(total / limit);
    return (
      <>
        <Grid container spacing={2}>
            {bookList.map(book => <Grid item key={book.id} xs={12} md={3} lg={3}><BookPreview book={book}/></Grid>) }
        </Grid>
          <Grid container justifyContent='center' padding={2}>
              <Pagination count={pageCount} onChange={onChangePage}/>
          </Grid>
      </>
   );
};

export default BookListPage;