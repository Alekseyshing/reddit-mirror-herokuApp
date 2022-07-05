import { Reducer, ActionCreator } from "redux";
import {
  MeRequestAction,
  MeRequestErrorAction,
  MeRequestSuccessAction,
  ME_REQUEST, ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS
} from "../actions/me/actions";
import { meReducer, MeState } from "../reducers/me/reducer";
import { SetTokenAction, SET_TOKEN } from "../actions/token/actions";
import { tokenReducer, TokenState } from "../reducers/token/reducer";

export type RootState = {
  commentText: string;
  token: TokenState;
  loggedIn: boolean;
  me: MeState
}

const initialState: RootState = {
  commentText: "Привет, Skillbox",
  loggedIn: false,
  token: {
    token: '',
  },
  me: {
    loading: false,
    error: '',
    data: {}
  }
}


const UPDATE_COMMENT = 'UPDATE_COMMENT';


type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  text: string;
}


export const updateComment: ActionCreator<UpdateCommentAction> = (text) => ({
  type: UPDATE_COMMENT,
  text
});

type MyAction = UpdateCommentAction | SetTokenAction | MeRequestAction | MeRequestSuccessAction | MeRequestErrorAction;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: tokenReducer(state.token, action),
        loggedIn: action.token !== 'undefined',
      };
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action)
      }
    default:
      return state;
  }

}
