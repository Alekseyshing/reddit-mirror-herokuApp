import { Reducer } from "react";
import { IUserData, MeRequestAction, MeRequestErrorAction, MeRequestSuccessAction, ME_REQUEST, ME_REQUEST_ERROR, ME_REQUEST_SUCCESS } from "../../actions/me/actions";

export type MeState = {
  loading: boolean,
  error: string,
  data: IUserData
}

type MeActions = MeRequestAction | MeRequestSuccessAction | MeRequestErrorAction;

export const meReducer: Reducer<MeState, MeActions> = (state, action) => {
  switch (action.type) {
    case ME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state
    case ME_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };
      case ME_REQUEST_SUCCESS:
        return {
          ...state,
          data: action.data,
          loading: false
        };
  }
}
