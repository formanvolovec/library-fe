import React, { useEffect } from 'react';
import { IBook } from "../../models/IBook";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "./components/Book/Book";
import { BookSaga, RouteEnum } from "../../shared/enums";
import { Button, Grid, Link, Typography } from "@mui/material";

export const BookPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams() as any;
  const book: IBook = useSelector((state: any) => state.bookReducer.book);
  const getBook = () => {
    dispatch({type: BookSaga.GET, payload: id});
  }
  useEffect(() => getBook(), []);
  const history = useHistory();
  const goToRegisterPage = () => {
    history.replace( RouteEnum.REGISTER )
  }
  const goToLoginPage = () => {
    history.replace( RouteEnum.LOGIN )
  }
  return (
    <>
      { (!book &&
        <Grid container justifyContent='center' color='mediumblue' fontFamily='Arial' padding={ 10 }>
          <Typography variant='h5' color='primary'>You don't have access! Please login or register.</Typography>
            <Grid container justifyContent='center' spacing={ 2 } padding={ 1 }>
              <Grid item>
                <Button variant="contained" onClick={ goToLoginPage }>Login</Button>
              </Grid>
                <Grid item>
                <Button variant="contained" onClick={ goToRegisterPage }>Register</Button>
              </Grid>
            </Grid>
        </Grid>)

        || <Book book={book}/>}
    </>
  )
}
