import { call, put, takeEvery } from '@redux-saga/core/effects'
import { getProfile, loginUser, registerUser } from '../../common/api/auth.api';
import { AuthDispatch, AuthReducer } from "../../enum/enums";

function* login(action: any) {
  try {
    const {token, user } = yield call(loginUser, action.payload);
    yield put({type: AuthReducer.SET, payload: {token, user}});
  } catch (e: any) {
    yield put({type: '[Auth] Set fetch error', error: ''})
  }
}

function* register(action: any) {
  try {
    const {token, user} = yield call(registerUser, action.payload);
    yield put({type: AuthReducer.SET, payload: {token, user}});
    yield call(action.push ,'/book-list')
  } catch (e: any) {
    yield put({type: AuthReducer.SET_ERROR, payload: e.message})
  }
}

function* profile(action: any){
  try {
    const user: Record<string, any> = yield call(getProfile);
    yield put({type: AuthReducer.GET, payload: {user}})
  } catch (e: any) {
    yield put({type: '[Auth] Set fetch error', message: e.message})
  }
}
export default function* userSaga() {
  yield takeEvery(AuthDispatch.SET_LOGIN, login);
  yield takeEvery(AuthDispatch.SET_REGISTER, register);
  yield takeEvery(AuthDispatch.GET_PROFILE, profile)
}
