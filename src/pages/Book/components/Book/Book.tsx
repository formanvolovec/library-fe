import React from 'react';
import { IBook } from "../../../../models/IBook";
import { Button, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";
import { encode } from "../../../BookList/components/BookPreview/BookPreview";
import { KeyboardBackspace } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { RouteEnum } from "../../../../shared/enums";
import EditIcon from '@mui/icons-material/Edit';

export interface IBookProps {
  book: IBook;
}

export const Book = (props: IBookProps) => {
  const {book} = props;
  const noPhoto = process.env.PUBLIC_URL + '../../no-image.jpeg';
  const picture = book.picture ? `data:image/jpeg;base64,${encode(book.picture.data)}` : noPhoto;
  const isAdmin = useSelector((state: any) => state.authReducer.isAdmin);
  const history = useHistory();
  const onEdit = () => history.replace(`${RouteEnum.EDITBOOK}/${book.id}`);
  const goBack = () => history.replace(RouteEnum.BOOKLIST);

return (
  <>
    <Grid container direction="row" justifyContent="center" xs={ 12 }>
      <Grid item xs={ 12 } md={ 8 }>
        <Grid item paddingBottom={ 2 }>
          <Button onClick={goBack} variant="text" id="button" type='button' startIcon={ <KeyboardBackspace /> }>Back</Button>
        </Grid>
        <CardActionArea>
          <Grid item justifyContent='center'>
            <CardMedia style={{ maxWidth:'75%', margin: '0 auto'}} component="img" image={picture} alt="image"/>
          </Grid>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h3" component="div">
                  {book.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="body1" component="div">
                  {book.authorName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="body2" component="div">
                  Public Year: {book.date}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle2" component="div">
                  Genre: {book.genre}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {book.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <Grid>
          {
            (isAdmin &&
                <Grid container direction="row" spacing={2} padding='1rem'>
                    <Grid item><DeleteModal/></Grid>
                    <Grid item><Button onClick={ onEdit } startIcon={ <EditIcon /> }>Edit Book</Button></Grid>
                </Grid>)
            || <>
                  <Grid item><Button disabled>Download</Button></Grid>
              </>
          }
        </Grid>
      </Grid>
  </Grid>
  </>
)
};
