import React from 'react';
import { IBook } from "../../../../models/book.interface";
import { Button, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";

export interface IBookProps {
  book: IBook;
}

export const Book = (props: IBookProps) => {
  const { book } = props;
  const isAdmin = useSelector((state: any) => state.authReducer.isAdmin);

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        <Grid item md={ 8 } xs={ 4 }>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                { book.title }
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                { book.authorName }
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                Public Year: { book.date }
              </Typography> <Typography gutterBottom variant="subtitle2" component="div">
              Genre: { book.genre }
            </Typography>
              <Typography variant="body2" color="text.secondary">
                { book.description }
              </Typography>
            </CardContent>
          </CardActionArea>
          <Grid>
            {
              (isAdmin &&
                <Grid container direction="row" spacing={ 2 }>
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
