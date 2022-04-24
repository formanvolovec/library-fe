import { CoreEnum } from "../../shared/enums";
import { toast } from "react-toastify";

interface reducerState {

}

const initialState = {};

interface ICoreAction {
  type: CoreEnum,
  payload: string;
}

export default function coreReducer(state: reducerState = initialState, action: ICoreAction) {
  switch (action.type) {
    case CoreEnum.ERROR:
      toast.error(action.payload)
      return {
        ...state,
      }
    case CoreEnum.INFO:
      toast.info(action.payload)
      return {
        ...state,
      }
    default:
      return state;
  }
}
