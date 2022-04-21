import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import BookListPage from "./pages/Book-list/BookListPage";
import { Header } from "./components/Header/Header";
import { BookPage } from "./pages/Book/BookPage";
import { useDispatch, useSelector } from "react-redux";
import { AuthSaga } from "./enums";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookAddPage from "./pages/Book-add/BookAddPage";


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
