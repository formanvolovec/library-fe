import { call, put, takeEvery } from '@redux-saga/core/effects'
import { getProfile, loginUser, registerUser } from '../../common/api/auth.api';
import { AuthSaga, AuthReducer, CoreEnum } from "../../enums";
import { ISagaAction } from "../saga-action.type";

function* login(action: ISagaAction) {
  try {
    const { token, user } = yield call(loginUser, action.payload);
    yield put({ type: AuthReducer.SET, payload: { token, user } });
    yield call(action.push, '/book-list')
  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, payload: e.response.data.message})
  }
}

function* register(action: ISagaAction) {
  try {
    const { token, user } = yield call(registerUser, action.payload);
    yield put({ type: AuthReducer.SET, payload: { token, user } });
    yield call(action.push, '/book-list')
  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, payload: e.response.data.message })
  }
}

function* profile() {
  try {
    const user: Record<string, any> = yield call(getProfile);
    yield put({ type: AuthReducer.PROFILE, payload: { user } })
  } catch (e: any) {
    yield put({ type: AuthReducer.LOGOUT, message: e.message.data.message })
  }
}

export default function* userSaga() {
  yield takeEvery(AuthSaga.LOGIN, login);
  yield takeEvery(AuthSaga.REGISTER, register);
  yield takeEvery(AuthSaga.PROFILE, profile)
}
