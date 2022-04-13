import React from "react"
import TextField from "@mui/material/TextField";
import './login.page.scss';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { ILogin } from "../../models/login-user.dto";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const {register, handleSubmit} = useForm<ILogin>();
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = (data: ILogin) => {
        dispatch({
            type: 'LOGIN_USER',
            payload: data
        });
        history.replace('book-list');
    };

    const goToRegisterPage = () => {
        history.replace('/register')
    }

    return (
        <div className='login-page'>
            <div className='login-page-container'>
                <div>Login</div>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="standard-basic"
                        label="email"
                        className='input'
                        {...register("email", { required: true })}
                        variant="standard"/>
                    <TextField
                        id="standard-basic"
                        label="password"
                        className='input'
                        {...register("password", { required: true })}
                        variant="standard"/>
                    <Button variant='contained' className="Button" type='submit'>Login</Button>
                </form>

                <div>
                    <div onClick={goToRegisterPage} className='create-account'>Create account</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
