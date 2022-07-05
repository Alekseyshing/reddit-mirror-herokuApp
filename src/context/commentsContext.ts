import React from 'react'

interface ICommentsContextData {
  author?: string;
  text?: string;
  id: string;
  created_utc: number;
}

export const commentsContext = React.createContext<ICommentsContextData[] | undefined>([]);
