import { call, put, takeEvery } from '@redux-saga/core/effects'
import { getProfile, loginUser, registerUser } from '../../common/api/auth.api';
import { AuthSaga, AuthReducer, CoreEnum, RouteEnum } from "../../shared/enums";
import { ISagaAction } from "../saga-action.type";
import { getErrorMessage } from "../../shared/utils";

function* login(action: ISagaAction) {
  try {
    const { token, user } = yield call(loginUser, action.payload);
    yield put({ type: AuthReducer.SET, payload: { token, user } });
    yield call(action.push, RouteEnum.BOOKLIST)

  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, payload: getErrorMessage(e)})

  }
}

function* register(action: ISagaAction) {
  try {
    const { token, user } = yield call(registerUser, action.payload);
    yield put({ type: AuthReducer.SET, payload: { token, user } });
    yield call(action.push, RouteEnum.BOOKLIST)
    yield put({type: CoreEnum.INFO, payload: 'Register successfully'})
  } catch (e: any) {
    yield put({ type: CoreEnum.ERROR, payload: getErrorMessage(e) })
  }
}

function* profile() {
  try {
    const user: Record<string, any> = yield call(getProfile);
    yield put({ type: AuthReducer.PROFILE, payload: { user } })
  } catch (e: any) {
    yield put({ type: AuthReducer.LOGOUT})
  }
}

function* logout(){
  yield put({type: AuthReducer.LOGOUT})
  yield put({type: CoreEnum.INFO, payload: 'You are logged out'})
}
export default function* userSaga() {
  yield takeEvery(AuthSaga.LOGIN, login);
  yield takeEvery(AuthSaga.REGISTER, register);
  yield takeEvery(AuthSaga.PROFILE, profile)
  yield takeEvery(AuthSaga.LOGOUT, logout)
}
