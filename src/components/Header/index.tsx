import React from 'react';
import { Button, Grid, Link, TextField } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthReducer, BookDispatch } from "../../enum/enums";


export const Header = () => {
  const history = useHistory()
  const location = useLocation();
  const dispatch = useDispatch();
  const onLogin = () => history.replace('/login');
  const onRegister = () => history.replace('/register');
  const onBooksList = () => history.replace('/book-list');
  const isLoggedIn = useSelector((state: any) => state.authReducer.isLoggedIn);
  const onLogout = () => {
    dispatch({type: AuthReducer.LOGOUT});
    onBooksList();
  }
  const onSearch = (event: any) => {
    const title = event.target.value;
    dispatch({type: BookDispatch.LOAD, payload: {title}});
    if (location.pathname !== '/book-list') {
      history.replace('/book-list')
    }
  }
  return (
    <Grid container direction="row">
      <Grid item padding={2} md={6}><Button onClick={onBooksList}>Library</Button></Grid>
      <Grid container item md={6} justifyContent="end" padding={2} spacing={1}>
        <Grid item>
          <TextField id="filled-hidden-label-small" size="small" variant="standard" onChange={onSearch} label="Search"/>
        </Grid>
        {
          (isLoggedIn
            && <Grid item><Button onClick={onLogout}>Log out</Button></Grid>)
          || <>
                <Grid item><Button onClick={onLogin}>Log in</Button></Grid>
                <Grid item><Button onClick={onRegister}>Sign in</Button></Grid>
            </>
        }
      </Grid>
    </Grid>
  );
}

