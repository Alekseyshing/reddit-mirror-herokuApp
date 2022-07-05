import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserData,  meRequestAsync} from "../../../redux/actions/me/actions";
import { RootState } from "../../../redux/store/store";

export function useUserData() {
  const data = useSelector<RootState, IUserData>(state => state.me.data);
  const loading = useSelector<RootState, boolean>(state => state.me.loading);
  const token = useSelector<RootState, string>(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && token.length > 0 && token != "undefined") {
      dispatch<any>(meRequestAsync())
    } else return
  }, [token])
  return {
    data,
    loading
  }
}

