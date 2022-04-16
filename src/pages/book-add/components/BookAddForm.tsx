import React from 'react';
import { Button, Grid, Typography } from "@mui/material";
import { ILogin } from "../../../models/login-user.dto";
import { AuthSaga } from "../../../enums";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IBookAdd } from "../../../models/IBookAdd";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';
import UploadIcon from '@mui/icons-material/Upload';

const BookAddForm = () => {
  const { handleSubmit, formState: { errors } } = useForm<IBookAdd>();
  const history = useHistory()
  const dispatch = useDispatch()
  const onSubmit = async (data: ILogin) => {
    dispatch({ type: AuthSaga.LOGIN, payload: data, push: history.push });
  };
  return (
    <>
      <Grid container xs={ 12 } spacing={ 2 } justifyContent="center" padding='1rem' >
       <form className='add-form' onSubmit={ handleSubmit(onSubmit) }>
         <Grid item xs>
           <Typography textTransform='uppercase' fontFamily='Arial'>Add book</Typography>
         </Grid>
         <Box sx ={{padding: '1rem', border: 1.5, borderRadius: 2}}>
            <Grid item xs>
              <TextField fullWidth id="title" className='input' label="title" variant="standard"/>
              <TextField fullWidth id="author name" className='input' label="author name" variant="standard"/>
              <TextField fullWidth id="year" className='input' label="year" variant="standard"/>
              <TextField fullWidth id="role" className='input' label="role" variant="standard"/>
              <TextField fullWidth id="genre" className='input' label="genre" variant="standard"/>
              <TextField fullWidth id="description" className='input' label="description" variant="standard"/>
            </Grid>
            <Grid container xs={ 12 } spacing={ 1 } paddingTop='1rem' justifyContent='start'>
              <Grid item padding='1rem'>
                <Button id="submitButton" variant='contained' type='submit' endIcon={ <SendIcon /> }>Add book</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size='large' component="label" endIcon={ <UploadIcon /> }>
                  <input type="file" id="book_pic" accept=".jpg, .jpeg, .png"/>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Grid>
    </>
  );
};

export default BookAddForm;
