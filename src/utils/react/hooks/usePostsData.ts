import axios from "axios";
import { useEffect, useState } from "react";

export interface IPostsData {
  author?: string;
  title?: string;
  href?: string;
  url?: string;
  permalink?: string;
  preview?: string;
  id: string;
  cardNumber: number;
  element?: React.ReactNode,
  commentsNumber: number,
  karmaValue: number,
  created_utc: number;
  avatar?: string;
  onClick: (id: string) => void;
  subreddit?:string;
}

export function usePostsData(token: string) {
  const [posts, setPosts] = useState<IPostsData[]>();

  useEffect(() => {
    try {
      if (token && token.length > 0 && token != "undefined") {
        axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
          headers: { Authorization: `bearer ${token}` }
        })
          .then((resp) => {
            const postsData = resp.data.data.children;
            const dataList: IPostsData[] = [];

            for (let i = 0; i < postsData.length; i++) {
              dataList.push({
                author: postsData[i].data.author,
                title: postsData[i].data.title,
                url: postsData[i].data.url,
                permalink: postsData[i].data.permalink,
                preview: postsData[i].data?.preview?.images[0]?.source?.url,
                id: postsData[i].data?.id,
                cardNumber: i,
                element: postsData[i].data,
                commentsNumber: postsData[i].data?.num_comments,
                karmaValue: postsData[i].data?.score,
                created_utc: postsData[i].data?.created_utc,
                avatar: postsData[i].data.sr_detail.icon_img,
                subreddit: postsData[i].data.subreddit,
                onClick: () => { }
              });
            }

            if (postsData !== undefined) {
              setPosts(dataList.filter(arr => arr.preview !== undefined && !arr.preview.includes('external')));
            }
          })
      }
    } catch (error) {
      console.error(error)
    }
  }, [token])


  return [posts];
}
