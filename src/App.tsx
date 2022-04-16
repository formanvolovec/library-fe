import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import BookListPage from "./pages/book-list/BookListPage";
import { Header } from "./components/Header";
import { BookPage } from "./pages/book/BookPage";
import { useDispatch, useSelector } from "react-redux";
import { AuthSaga } from "./enums";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookAddPage from "./pages/book-add/BookAddPage";


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
      <Header/>
      {
        isAdmin &&
        <>
          <Route exact path='/add-book'>
              <BookAddPage/>
          </Route>
        </>
      }
      <Route exact path='/login'>
        <LoginPage/>
      </Route>
      <Route exact path='/register'>
        <RegisterPage/>
      </Route>
      <Route exact path='/book-list'>
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
