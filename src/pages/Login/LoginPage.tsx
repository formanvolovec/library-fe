import React from "react"
import { useHistory } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import  LoginForm  from "./components/LoginForm";

const LoginPage = () => {
  const history = useHistory();
  const goToRegisterPage = () => {
    history.replace('/register')
  }

  return (
    <>
      <LoginForm/>
        <Grid container justifyContent='center'>
            <Button onClick={ goToRegisterPage }>Don't have an account? Register</Button>
        </Grid>
    </>
  );
};
export default LoginPage;

