import { axios } from './default-axios.api'
import {RegisterUserDto} from '../../models/register-user.dto';
import {LoginResponseDto} from "../../models/login.response.dto";

export const loginUser = async (data: LoginResponseDto)  => {
    try {
        const updateTopic = await axios.post('auth/login', data)
        return updateTopic.data.token;
    } catch (err: any) {
        console.log(err)
    }
}

export const registerUser = async (data: RegisterUserDto) => {
    try {
        const updateTopic = await axios.post('auth/register', data)
        return updateTopic.data.token;
    } catch (err: any) {
        console.log(err)
    }
}

