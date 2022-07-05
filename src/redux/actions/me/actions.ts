import axios from "axios"
import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../../store/store"

export const ME_REQUEST = 'ME_REQUEST'
export type MeRequestAction = {
  type: typeof ME_REQUEST
}
export const meRequest: ActionCreator<MeRequestAction> = () => ({
  type: ME_REQUEST
})

export interface IUserData {
  name?: string;
  iconImg?: string;
}

export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS'
export type MeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS,
  data: IUserData
}
export const meRequestSuccess: ActionCreator<MeRequestSuccessAction> = (data: IUserData) => ({
  type: ME_REQUEST_SUCCESS,
  data
})

export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR'
export type MeRequestErrorAction = {
  type: typeof ME_REQUEST_ERROR,
  error: string
}
export const meRequestError: ActionCreator<MeRequestErrorAction> = (error: string) => ({
  type: ME_REQUEST_ERROR,
  error
})

export const meRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(meRequest());
  axios({
    method: 'get',
    url: "https://oauth.reddit.com/api/v1/me.json",
    headers: { 'Authorization': `bearer ${getState().token.token}` }
  }).then((resp) => {
    const userData = resp.data;
    const splittedImg = userData.icon_img.split('&')[0].split('?')[0];

    dispatch(meRequestSuccess({ name: userData.name, iconImg: splittedImg }));

  })
    .catch((error) => {
      console.log(error);
      dispatch(meRequestError(String(error)));
    })
}
