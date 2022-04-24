import React, { useState } from 'react';
import { Button, Grid, Typography } from "@mui/material";
import { BookDispatch, RouteEnum } from "../../../enums";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IBookAdd } from "../../../models/IBookAdd";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import UploadIcon from '@mui/icons-material/Upload';
import { KeyboardBackspace } from "@mui/icons-material";

const BookAddForm = () => {
  const { register, handleSubmit,  formState: { errors } } = useForm<IBookAdd>();
  const [ selectedFile, setSelectedFile ] = useState();
  const history = useHistory()
  const dispatch = useDispatch()
  const goBack = () => {
    history.replace(RouteEnum.BOOKLIST)
  }
  const onSubmit = async (data: IBookAdd) => {
    const formData = new FormData();
    // @ts-ignore
    Object.keys(data).forEach(key => formData.append(key, data[key as typeof IBookAdd]))
    // @ts-ignore
    formData.append('picture', selectedFile)
    dispatch({ type: BookDispatch.ADD, payload: formData, push: history.push });
  };
  const fileSelectedHandler = (event: any) => {
      setSelectedFile(event.target.files[0]);
  };
  return (
    <>
      <Grid container direction='column' spacing={ 2 } justifyContent="center" padding='1rem' >
       <form className='add-form' onSubmit={ handleSubmit(onSubmit) }>
         <Grid item paddingBottom={ 2 }>
           <Button onClick={goBack} variant="text" id="button"  type='button' startIcon={ <KeyboardBackspace /> }>Back</Button>
         </Grid>
         <Grid item xs>
           <Typography textTransform='uppercase' fontFamily='Arial'>Add book</Typography>
         </Grid>
            <Grid item xs>
              <TextField fullWidth
                         id="title"
                         className='input'
                         label="Title"
                         variant="standard"
                         {...register("title", { required: true, minLength: 2 }) }/>
              { errors.title?.type === 'required' &&
                  <Typography fontSize="0.75rem" color="red">Title is required</Typography> }
              { errors.title?.type === 'minLength' &&
                  <Typography fontSize="0.75rem" color="red">enter 2 or more characters</Typography> }
              <TextField fullWidth
                         id="author name"
                         className='input'
                         label="Author name"
                         variant="standard"
                         {...register("authorName", { required: true, minLength: 3 }) }/>
              { errors.authorName?.type === 'required' &&
                  <Typography fontSize="0.75rem" color="red">Author name is required</Typography> }
              { errors.authorName?.type === 'minLength' &&
                  <Typography fontSize="0.75rem" color="red">enter 3 or more characters</Typography> }
              <TextField fullWidth
                         id="date"
                         className='input'
                         label="Date"
                         variant="standard"
                         {...register("date", { required: true, minLength: 4, maxLength: 4 }) }/>
              { errors.date?.type === 'required' &&
                  <Typography fontSize="0.75rem" color="red">Date is required</Typography> }
              { errors.date?.type === 'minLength' &&
                  <Typography fontSize="0.75rem" color="red">minimal length must be 4 characters</Typography> }
              <TextField fullWidth
                         id="genre"
                         className='input'
                         label="Genre"
                         variant="standard"
                         {...register("genre", { required: true, minLength: 2 }) }/>
              { errors.genre?.type === 'required' &&
                  <Typography fontSize="0.75rem" color="red">Genre is required</Typography> }
              { errors.genre?.type === 'minLength' &&
                  <Typography fontSize="0.75rem" color="red">enter 2 or more characters</Typography> }
              <TextField fullWidth
                         id="description"
                         className='input'
                         label="Description"
                         variant="standard"
                         {...register("description", { required: true, minLength: 10 }) }/>
              { errors.description?.type === 'required' &&
                  <Typography fontSize="0.75rem" color="red">Description is required</Typography> }
              { errors.description?.type === 'minLength' &&
                  <Typography fontSize="0.75rem" color="red">enter 10 or more characters</Typography> }
            </Grid>
            <Grid container spacing={ 1 } padding='1rem' justifyContent='start'>
              <Grid item padding='1rem'>
                <Button id="submitButton" variant='contained' type='submit' endIcon={ <SendIcon /> }>Add book</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size='large' component="label" endIcon={ <UploadIcon /> }>
                  <input required={true} onChange={fileSelectedHandler} type="file" id="book_pic" accept=".jpg, .jpeg, .png"
                   />
                </Button>
              </Grid>
            </Grid>
        </form>
      </Grid>
    </>
  );
};

export default BookAddForm;
