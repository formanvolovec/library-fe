import { CoreReducer } from "../../enums";
import { toast } from "react-toastify";

interface reducerState {

}

const initialState = {};

interface ICoreAction {
  type: CoreReducer,
  payload: string;
}

export default function coreReducer(state: reducerState = initialState, action: ICoreAction) {
  switch (action.type) {
    case CoreReducer.ERROR:
      toast.error(action.payload)
      return {
        ...state,
      }
    default:
      return state;
  }
}
