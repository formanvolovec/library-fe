import React, { useEffect } from 'react';
import { IBook } from "../../models/book.interface";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "./components/Book/Book";
import { BookDispatch } from "../../enums";
import { Grid, Typography } from "@mui/material";

export const BookPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams() as any;
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
      { (!book &&
        <Grid container justifyContent='center' color='mediumblue' fontFamily='Arial'>
          <Typography>No have permission. Please login or register</Typography>
        </Grid> ) || <Book book={book}/>}
    </>
  )
}
