import React from 'react';
import './register.page.scss'
import {Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form"
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {RegisterUserDto} from "../../models/register-user.dto";

const RegisterPage = () => {
    const {register, handleSubmit} = useForm<RegisterUserDto>()
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = async (data: RegisterUserDto) => {
        dispatch({
            type: 'REGISTER_USER',
            payload: data
        })
    };

    const goToLoginPage = () => {
        history.push('/login')
    }

    return (
        <div className='register-page'>
            <div className='register-page-container'>
                <div>Registration</div>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="standard-basic"
                        className='input'
                        label="username"
                        {...register("username", { required: true })}
                        variant="standard"/>
                    <TextField
                        id="standard-basic"
                        className='input'
                        label="email"
                        {...register("email", { required: true })}
                        variant="standard"/>
                    <TextField
                        id="standard-basic"
                        className='input'
                        label="password"
                        {...register("password", { required: true })}
                        variant="standard"/>
                    <Button variant='contained' className="Button" type='submit'>Registration</Button>
                </form>

                <div>
                    <div
                        onClick={goToLoginPage}
                        className='move-login-page'
                    >Already have account?</div>
                </div>
            </div>

        </div>
    );
};

export default RegisterPage;