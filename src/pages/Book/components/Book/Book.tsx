import React, { useState } from 'react';
import { IBook } from "../../../../models/IBook";
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";
// @ts-ignore
import { encode } from "uint8-to-base64";
import { KeyboardBackspace } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

export interface IBookProps {
  book: IBook;
}

export const Book = (props: IBookProps) => {
  const {book} = props;
  const noPhoto = process.env.PUBLIC_URL + '../../no-image.jpeg';
  const picture = book.picture ? `data:image/jpeg;base64,${encode(book.picture.data)}` : noPhoto;
  const history = useHistory();
  const goBack = () => {
    history.replace('/book-list')
  };
  const dispatch = useDispatch()
  const isAdmin = useSelector((state: any) => state.authReducer.isAdmin);
  const [newChanges, setNewChanges] = useState('');

  // const changeBook = (e: any) => {
  //   changeBook(e.Book.value)
  // }
  // const handleEdit = async () => {
  //   dispatch({
  //     type: BookReducer.UPDATE,
  //     payload: newChanges
  //   })
  //   setNewChanges('');

    return (
      <>
        <Grid container direction="row" justifyContent="center">
            <Grid item xs={ 4 } md={ 8 }>
              <Grid item paddingBottom={ 2 }>
                <Button onClick={goBack} variant="text" id="button" type='button' startIcon={ <KeyboardBackspace /> }>Back</Button>
              </Grid>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={picture}
                  alt="image"
                />
                <CardContent>

                  <Typography gutterBottom variant="h3" component="div">
                    {book.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {book.authorName}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Public Year: {book.date}
                  </Typography> <Typography gutterBottom variant="subtitle2" component="div">
                  Genre: {book.genre}
                </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Grid>
                {
                  (isAdmin &&
                      <Grid container direction="row" spacing={2} padding='1rem'>
                          <Grid item><DeleteModal/></Grid>
                          <Grid item><Button>Edit</Button></Grid>
                      </Grid>)
                  || <>
                        <Grid item><Button>Download</Button></Grid>
                    </>
                }
              </Grid>
            </Grid>
        </Grid>
      </>
    )
  };
