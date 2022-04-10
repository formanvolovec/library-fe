import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import WelcomePage from "./pages/welcome/welcome.page";
import RegisterPage from "./pages/register/register.page";
import LoginPage from "./pages/login/login.page";
import BookListPage from "./pages/book-list/book-list.page";
import MainBookPage from "./pages/add-book.page/add-book.page";



const isCookieJWTAvailable = () => !!localStorage.getItem('token');

const App = () => {

    const isLogined = isCookieJWTAvailable();

    return (
       <BrowserRouter>
           {
               isLogined &&
               <>
                   <Route exact path='/book-list'>
                       <BookListPage/>
                   </Route>
                   <Route exact path='/add-book'>
                       <MainBookPage/>
                   </Route>
               </>
           }
           <Route exact path='/'>
               <WelcomePage></WelcomePage>
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
