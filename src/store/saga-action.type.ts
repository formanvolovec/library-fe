import { AuthSaga, BookSaga } from "../shared/enums";

export interface ISagaAction {
  type: AuthSaga | BookSaga,
  payload: any,
  push?: any
}
