import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IBook } from "../../../../models/IBook";
import { useHistory } from "react-router-dom";
import { RouteEnum } from "../../../../shared/enums";

export const encode = (uint8array: Uint8Array) => {
  const output = [];
  for (let i = 0, {length} = uint8array; i < length; i++)
    output.push(String.fromCharCode(uint8array[i]));
  return btoa(output.join(''));
}

export interface IBookProps {
    book: IBook,
}
export const BookPreview = (props: IBookProps) => {
  const { book } = props;
  const history = useHistory();
  const noPhoto = process.env.PUBLIC_URL + 'no-image.jpeg';
  const picture = book.picture ? `data:image/jpeg;base64,${encode(book.picture.data)}` : noPhoto;
  const onView = () => history.replace(`${RouteEnum.BOOK}/${book.id}`)

  return (
    <Card raised>
      <CardMedia style={{ height: '20rem' }} component="img" image={picture} alt="no image"/>
      <CardContent>
        <Typography noWrap gutterBottom variant="h5" component="div">
          {book?.title}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          {`genre: ${book?.genre}`}
        </Typography>
        <Typography noWrap variant="body2">
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