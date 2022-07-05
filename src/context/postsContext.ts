import React from "react";



interface IPostsContextData {
  author?: string;
	title?: string;
  url?:string;
	permalink?: string;
	preview?: string;
  id:string;
  cardNumber: number;
  element?: React.ReactNode,
  commentsNumber: number,
  karmaValue: number,
  created_utc: number;
  avatar?: string;
  subreddit?: string;
  onClick: (id: string) => void,
}

export const postsContext = React.createContext<IPostsContextData[] | undefined>([]);


