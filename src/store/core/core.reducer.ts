import { CoreEnum } from "../../enums";
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
    default:
      return state;
  }
}
