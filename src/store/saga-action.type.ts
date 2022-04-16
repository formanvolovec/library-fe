import { AuthSaga, BookDispatch } from "../enums";

export interface ISagaAction {
  type: AuthSaga | BookDispatch,
  payload: any,
  push?: any
}
