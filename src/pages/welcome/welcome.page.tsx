import React from 'react';
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";
import './welcome.page.scss';

const WelcomePage = () => {
    const history = useHistory();

    const goToRegisterPage = () => {
        history.push('/register')
    }
    const goToLoginPage = () => {
        history.push('/login')
    }
    return (
            <div className='welcome-page'>
                <h1>Welcome to books library</h1>
                    <div className='button-page-container'>
                        <Button onClick={goToLoginPage}
                                variant='contained'
                                className="Button"
                                type='submit'>
                            Login</Button>
                        <Button onClick={goToRegisterPage}
                                variant='contained'
                                className="Button"
                                type='submit'>
                            Register</Button>
                    </div>
            </div>
    );
};

export default WelcomePage;
