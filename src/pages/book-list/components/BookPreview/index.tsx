import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import {IBook} from "../../../../models/book.interface";
import { useHistory } from "react-router-dom";


export interface IBookProps {
    book: IBook,
}
export const BookPreview = (props: IBookProps) => {
    const { book } = props;
    const history = useHistory();
    const noPhoto = process.env.PUBLIC_URL + 'no-image.jpeg';
    const onClick = () => history.replace(`book/${book.id}`)
    return (
        <Card>
            <CardMedia
                component="img"
                image={book?.photo || noPhoto}
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
                  <Button onClick={onClick} size="small">View more</Button>
                </Grid>
                <Grid item>
                  <Typography variant='caption'>{`publish year ${book?.date}`}</Typography>
                </Grid>
              </Grid>
            </CardActions>
        </Card>
    );
}