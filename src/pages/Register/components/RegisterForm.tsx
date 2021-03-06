import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { IRegisterUser } from "../../../models/IRegisterUser";
import { AuthSaga } from "../../../shared/enums";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterUser>();
  const history = useHistory();
  const dispatch = useDispatch();
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const onSubmit = async (data: IRegisterUser) => {
    dispatch({ type: AuthSaga.REGISTER, payload: data, push: history.push });
  }
  return (
    <Grid container spacing={ 2 } justifyContent='center'>
      <form className='register-form' onSubmit={ handleSubmit(onSubmit) }>
        <Grid item xs>
          <Typography textTransform='uppercase' fontFamily='Arial'>Register</Typography>
        </Grid>
        <Grid item xs>
          <TextField
            id="username"
            className='input'
            label="username"
            variant="standard"
            { ...register("username", { required: true, minLength: 3  }) }
            />
          { errors.username?.type === 'minLength' &&
              <Typography fontSize="0.75rem" color="red">enter 3 or more characters</Typography> }
          { errors.username?.type === 'required' &&
            <Typography fontSize="0.75rem" color="red">username is required</Typography> }
        </Grid>
        <Grid item xs>
          <TextField
            id="email"
            className='input'
            label="email"
            variant="standard"
            { ...register("email", {required: true, pattern: emailPattern }) }
            />
          { errors.email?.type === 'required' &&
            <Typography fontSize="0.75rem" color="red">email is required</Typography> }
          { errors.email?.type === 'pattern' &&
            <Typography fontSize="0.75rem" color="red">enter valid email</Typography> }
        </Grid>
        <Grid item xs>
          <TextField
            id="password"
            className='input'
            label="password"
            type='password'
            variant="standard"
            { ...register("password", { required: true, minLength: 6 }) }
            />
          { errors.password?.type === 'required' &&
            <Typography fontSize="0.75rem" color="red">password is required</Typography> }
          { errors.password?.type === 'minLength' &&
            <Typography fontSize="0.75rem" color="red">enter 6 or more characters</Typography> }
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item padding='1rem'>
            <Button id="submitButton" variant='contained' type='submit'>Registration</Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default RegisterForm;
