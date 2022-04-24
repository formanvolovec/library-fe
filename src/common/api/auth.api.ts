import { axios } from './default-axios.api'
import { IRegisterUser } from '../../models/IRegisterUser';
import { ILoginResponse } from "../../models/ILoginResponse";
import { prepareHeader } from "./axios.service";

export const loginUser = async (data: ILoginResponse) => {
  const response = await axios.post('auth/login', data)
  const { token, ...user } = response.data;
  return { token, user };
}

export const registerUser = async (data: IRegisterUser) => {
    const response = await axios.post('auth/register', data)
    const { token, ...user } = response.data;
    return { token, user };
}

export const getProfile = async () => {
  const response = await axios.get('auth/profile', prepareHeader())
  return response.data
}

