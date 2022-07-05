import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { setToken } from "../../../redux/actions/token/actions";

export function useToken (){
  const dispatch = useDispatch();
  const token = useSelector<RootState, string>(state => state.token.token);

  useEffect(() => {
    if(window.__token__){
      dispatch(setToken(window.__token__));
    }
  }, [])
  return [token]
}
