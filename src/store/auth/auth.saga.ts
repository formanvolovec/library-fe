import { call, put, takeEvery } from '@redux-saga/core/effects'
import { getProfile, loginUser, registerUser } from '../../common/api/auth.api';
import { AuthDispatch, AuthReducer } from "../../enum/enums";

function* login(action: any) {
  try {
    const {token, user } = yield call(loginUser, action.payload);
    yield put({type: AuthReducer.SET, payload: {token, user}});
  } catch (e: any) {
    yield put({type: 'GET_USERS_ERROR', message: e.message})
  }
}

function* register(action: any) {
  try {
    const {token, user} = yield call(registerUser, action.payload);
    yield put({type: AuthReducer.SET, payload: {token, user}});
  } catch (e: any) {
    yield put({type: 'GET_USERS_ERROR', message: e.message})
  }
}
function* profile(action: any){
  try {
    const user: Record<string, any> = yield call(getProfile);
    yield put({type: AuthReducer.GET, payload: {user}})
  } catch (e: any) {
    yield put({type: 'GET_USERS_ERROR', message: e.message})
  }
}
export default function* userSaga() {
  yield takeEvery(AuthDispatch.SET_LOGIN, login);
  yield takeEvery(AuthDispatch.SET_REGISTER, register);
  yield takeEvery(AuthDispatch.GET_PROFILE, profile)
}
