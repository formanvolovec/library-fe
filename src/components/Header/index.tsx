import React from 'react';
import { Button, Grid, TextField } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthSaga, BookDispatch, BookReducer, RouteEnum } from "../../enums";
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';

export const Index = () => {
  const history = useHistory()
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.authReducer.isLoggedIn);
  const isAdmin = useSelector((state: any) => state.authReducer.isAdmin);
  const onLogin = () => history.replace(RouteEnum.LOGIN);
  const onRegister = () => history.replace(RouteEnum.REGISTER);
  const onBooksList = () => history.replace(RouteEnum.BOOKLIST);
  const onAdd = () => history.replace(RouteEnum.BOOKADD);
  const onLogout = () => {
    dispatch({ type: AuthSaga.LOGOUT});
    onBooksList();
  }
  const onSearch = (event: any) => {
    const title = event.target.value;
    if(!title) {
      dispatch({type: BookReducer.CLEAR_TITLE});
    }
    dispatch({ type: BookDispatch.LOAD, payload: { title, offset: 0 } });
    if (location.pathname !== RouteEnum.BOOKLIST) {
      history.replace(RouteEnum.BOOKLIST)
    }
  }

  return (
    <Grid container direction="row">
      <Grid item md={ 6 } padding={ 2 }><Button startIcon={<HomeIcon />} onClick={ onBooksList }>Library</Button></Grid>
      <Grid container item md={ 6 } padding={ 2 } spacing={ 2 }justifyContent="end" >
        {
          (isAdmin
            && <Grid item>
                  <Button startIcon={<AddIcon />} onClick={ onAdd }>Add book</Button>
          </Grid>)
        }
        <Grid item>
          <TextField id="filled-hidden-label-small" size="small" variant="standard" onChange={ onSearch }
                     label="Search"/>
        </Grid>
        {
          (isLoggedIn
            && <Grid item><Button startIcon={<LogoutIcon />} onClick={ onLogout }>Log out</Button></Grid>)
          || <>
            <Grid item><Button startIcon={<LoginIcon />} onClick={ onLogin }>Log in</Button></Grid>
            <Grid item><Button startIcon={<HowToRegIcon />} onClick={ onRegister }>Sign in</Button></Grid>
          </>
        }
      </Grid>
    </Grid>
  );
}

