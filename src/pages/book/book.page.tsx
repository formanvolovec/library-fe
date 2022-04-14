import React, { useEffect } from 'react';
import { IBook } from "../../models/book.interface";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { Book } from "./components/Book";
import { BookDispatch, BookReducer } from "../../enum/enums";

export interface IBookProps {
  book: IBook;
}

export const BookPage = () => {
  const dispatch = useDispatch();
  const {id} = useParams() as any;
  const book: IBook = useSelector((state: any) => state.bookReducer.book);
  const getBook = () => {
    dispatch({
      type: BookDispatch.GET,
      payload: id
    });
  }
  useEffect(() => getBook(), [],);

  return (
    <>
      {(!book &&
           <Typography>Please login</Typography>) || <Book book={book}/>}
    </>
  )
}
