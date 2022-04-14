import { axios } from './default-axios.api'
import {IRegisterUser} from '../../models/IRegisterUser';
import {ILoginResponse} from "../../models/ILoginResponse";
import { prepareAuthHeader } from "./axios.service";

export const loginUser = async (data: ILoginResponse)  => {
    try {
        const response = await axios.post('auth/login', data)
        const { token, ...user } = response.data;
        return { token, user };
    } catch (err: any) {
        console.log(err)
    }
}

export const registerUser = async (data: IRegisterUser) => {
    try {
        const response = await axios.post('auth/register', data)
        const { token, ...user  } = response.data;
        return { token, user };
    } catch (err: any) {
        console.log(err)
    }
}

export const getProfile = async() => {
    try{
        const response = await axios.get('auth/profile', prepareAuthHeader())
        return response.data
    } catch (err: any) {
        console.log(err)
    }
}

