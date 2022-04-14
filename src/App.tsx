import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import RegisterPage from "./pages/register/register.page";
import LoginPage from "./pages/login/login.page";
import BookListPage from "./pages/book-list/book-list.page";
import { Header } from "./components/Header";
import { BookPage } from "./pages/book/book.page";
import { useDispatch, useSelector } from "react-redux";

const checkToken = () => localStorage.getItem('token');
const App = () => {
  const isLoggedIn = useSelector((state: any) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();
  if (checkToken()) {
    dispatch({type: 'Profile'})
  }
  return (
    <BrowserRouter>
      <Header/>
      {
        isLoggedIn &&
          <>
              <Route exact path='/add-book'>
              </Route>
          </>
      }
      <Route exact path='/book/:id'>
        <BookPage/>
      </Route>
      <Route exact path='/book-list'>
        <BookListPage/>
      </Route>
      <Route exact path='/register'>
        <RegisterPage></RegisterPage>

      </Route>
      <Route exact path='/login'>
        <LoginPage></LoginPage>
      </Route>
    </BrowserRouter>
  );
};

export default App;
