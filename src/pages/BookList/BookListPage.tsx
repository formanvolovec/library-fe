import React, { useEffect } from 'react';
import { Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IBook } from "../../models/IBook";
import { BookPreview } from "./components/BookPreview/BookPreview"
import { BookSaga } from "../../shared/enums";

const BookListPage = () => {
  const bookList: IBook[] = useSelector((state: any) => state.bookReducer.books);
  const { limit, offset, title } = useSelector((state: any) => state.bookReducer.search);
  const total = useSelector((state: any) => state.bookReducer.total);
  const dispatch = useDispatch();
  const onChangePage = async (e: any, value: number) => {
    dispatch({ type: BookSaga.LOAD, payload: { offset: value, title }}) }
  const loadBooks = () => {
    dispatch({ type: BookSaga.LOAD, payload: { offset, limit, title }}) }
  const pageCount = Math.ceil(total / limit);

  useEffect(() => loadBooks(), [],)

  return (
    <>
      <Grid container spacing={ 2 }>
        { bookList.map(book =>
          <Grid item key={ book.id } xs={ 12 } md={ 3 } lg={ 3 }>
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
