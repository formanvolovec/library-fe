import React from "react"
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { ILogin } from "../../../models/ILogin";
import { useDispatch } from "react-redux";
import { AuthSaga } from "../../../shared/enums";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const history = useHistory();
  const dispatch = useDispatch();
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const onSubmit = async (data: ILogin) => {
    dispatch({ type: AuthSaga.LOGIN, payload: data, push: history.push });
  };
  return (
    <Grid container spacing={ 2 } justifyContent='center'>
      <form className='login-form' onSubmit={ handleSubmit(onSubmit) }>
        <Grid item xs>
          <Typography textTransform='uppercase' fontFamily='Arial'>Login</Typography>
        </Grid>
        <Grid item xs >
          <TextField
            id="email"
            className='input'
            label="email"
            variant="standard"
            {...register("email", {required: true, pattern: emailPattern}) }/>
          { errors.email?.type === 'required' &&
              <Typography fontSize="0.75rem" color="red">email is required</Typography> }
        </Grid>
        <Grid item xs>
          <TextField
            id="password"
            className='input'
            label="password"
            type='password'
            variant="standard"
            {...register("password", { required: true, minLength: 6 }) }/>
          { errors.password?.type === 'required' &&
              <Typography fontSize="0.75rem" color="red">email is required</Typography> }
          { errors.password?.type === 'minLength' &&
              <Typography fontSize="0.75rem" color="red">enter 6 or more characters</Typography> }
        </Grid>
          <Grid container justifyContent='center'>
            <Grid item padding='1rem'>
              <Button id="submitButton" variant='contained' type='submit'>login</Button>
            </Grid>
          </Grid>
      </form>
    </Grid>
  );
}

export default LoginForm;