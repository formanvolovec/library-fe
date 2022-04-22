import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IBook } from "../../../../models/IBook";
import { useHistory } from "react-router-dom";
// @ts-ignore
import { encode } from "uint8-to-base64";


export interface IBookProps {
    book: IBook,
}
export const BookPreview = (props: IBookProps) => {
  const { book } = props;
  const history = useHistory();
  const noPhoto = process.env.PUBLIC_URL + 'no-image.jpeg';
  const picture = book.picture ? `data:image/jpeg;base64,${encode(book.picture.data)}` : noPhoto;
  const onView = () => history.replace(`book/${book.id}`)

  return (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
        component="img"
        image={picture}
        alt="no image"
    />
    <CardContent>
        <Typography noWrap gutterBottom variant="h5" component="div">
            {book?.title}
        </Typography>
        <Typography noWrap maxHeight="3rem" variant="body2" color="text.secondary">
            {book?.description}
        </Typography>
    </CardContent>
    <CardActions>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button onClick={onView} size="small">View more</Button>
        </Grid>
        <Grid item>
          <Typography variant='caption'>{`public year ${book?.date}`}</Typography>
        </Grid>
      </Grid>
    </CardActions>
  </Card>
  );
}