import React, { useEffect } from 'react';
import { Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IBook } from "../../models/IBook";
import { BookPreview } from "./components/BookPreview/BookPreview"
import { BookDispatch } from "../../enums";

const BookListPage = () => {
  const bookList: IBook[] = useSelector((state: any) => state.bookReducer.books);
  const { limit, offset, title } = useSelector((state: any) => state.bookReducer.search);
  const total = useSelector((state: any) => state.bookReducer.total);
  const dispatch = useDispatch();
  const loadBooks = () => {
    dispatch({
      type: BookDispatch.LOAD,
      payload: { limit, offset, title }
    })
  }
  useEffect(() => loadBooks(), [])

  const onChangePage = async (e: any, value: number) => {
    dispatch({
      type: BookDispatch.LOAD,
      payload: { offset: value, title }
    })
  }

  const pageCount = Math.ceil(total / limit);
  return (
    <>
      <Grid container spacing={ 2 }>
        { bookList.map(book => <Grid item key={ book.id } xs={ 12 } md={ 3 } lg={ 3 }>
          <BookPreview book={ book }/>
        </Grid>) }
      </Grid>
      <Grid container justifyContent='center' padding={ 2 }>
        <Pagination count={ pageCount } onChange={ onChangePage }/>
      </Grid>
    </>
  );
};

export default BookListPage;
