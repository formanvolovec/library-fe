import { axios } from './default-axios.api'
import {RegisterUser} from '../../models/register.user';
import {ILoginResponse} from "../../models/ILoginResponse";

export const loginUser = async (data: ILoginResponse)  => {
    try {
        const updateTopic = await axios.post('auth/login', data)
        return updateTopic.data.token;
    } catch (err: any) {
        console.log(err)
    }
}

export const registerUser = async (data: RegisterUser) => {
    try {
        const updateTopic = await axios.post('auth/register', data)
        return updateTopic.data.token;
    } catch (err: any) {
        console.log(err)
    }
}

