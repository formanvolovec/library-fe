import React from 'react';
import { useHistory } from "react-router-dom";
import  RegisterForm  from "./components/RegisterForm";
import { Button, Grid } from "@mui/material";

const RegisterPage = () => {
  const history = useHistory();
  const goToLoginPage = () => {
    history.replace('/login')
  }

  return (
    <>
      <RegisterForm/>
        <Grid container justifyContent="center">
          <Button onClick={ goToLoginPage }>Already have account? Log in</Button>
        </Grid>
    </>
  );
};
export default RegisterPage;
