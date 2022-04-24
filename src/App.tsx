import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import BookListPage from "./pages/BookList/BookListPage";
import BookAddPage from "./pages/BookAdd/BookAddPage";
import BookEditPage from "./pages/BookEdit/BookEditPage";
import { Index } from "./components/Header";
import { BookPage } from "./pages/Book/BookPage";
import { useDispatch, useSelector } from "react-redux";
import { AuthSaga, RouteEnum } from "./enums";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const checkToken = () => localStorage.getItem('token');
const App = () => {
  const isAdmin = useSelector((state: any) => state.authReducer.isAdmin);
  const user = useSelector((state: any) => state.authReducer.user);

  const dispatch = useDispatch();
  if (checkToken() && !user) {
    dispatch({ type: AuthSaga.PROFILE })
  }
  return (
    <BrowserRouter>
      <Index/>
      {
        isAdmin &&
        <>
          <Route exact path={ RouteEnum.BOOKADD }>
              <BookAddPage/>
          </Route>
          <Route exact path={ RouteEnum.BOOKEDIT }>
              <BookEditPage/>
          </Route>
        </>
      }
      <Route exact path={ RouteEnum.LOGIN }>
        <LoginPage/>
      </Route>
      <Route exact path={ RouteEnum.REGISTER }>
        <RegisterPage/>
      </Route>
      <Route exact path={ RouteEnum.BOOKLIST}>
        <BookListPage/>
      </Route>
      <Route exact path='/book/:id'>
        <BookPage/>
      </Route>
      <ToastContainer position="top-center" hideProgressBar autoClose={1000}/>
    </BrowserRouter>

  );
};

export default App;
