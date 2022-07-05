import React, { Children } from "react";
import { useUserData } from "../utils/react/hooks/useUserData";

export interface IUserContextData {
  name?:string;
  iconImg?:string;
  data?: IUserContextData;
  loading?: boolean;
}

export const userContext = React.createContext<IUserContextData>({})

export function UserContextProvider({ children }: { children: React.ReactNode}){
  const {data, loading} = useUserData()
  return(
    <userContext.Provider value={{data, loading}}>
      {children}
    </userContext.Provider>
  )
}
