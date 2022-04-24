import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IBook } from "../../models/IBook";
import { BookSaga } from "../../shared/enums";
import BookForm from "../../components/BookForm/BookForm";

const BookEditPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams() as any;
  const book: IBook = useSelector((state: any) => state.bookReducer.book);
  const getBook = () => {
    dispatch({type: BookSaga.GET, payload: id});
  }
  useEffect(() => getBook(), []);

  return (
    <>
      <BookForm book={book}/>
    </>
  );
};

export default BookEditPage;
