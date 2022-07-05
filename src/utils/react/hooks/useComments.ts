import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";


interface ICommentData {
  author?: string;
  text?: string;
  id?: string;
  created_utc?: number;
}


export function useComments(id?: string) {
  const [comments, setComments] = useState<ICommentData[]>()
  const token = useSelector<RootState, string>(state => state.token.token);

  useEffect(() => {
    if (token && token.length > 0 && token != "undefined") {
      axios.get(`https://oauth.reddit.com/comments/${id}.json?sr_detail=true&limit=20`,
          { headers: { Authorization: `bearer ${token}` }
        })

        .then((resp) => {
          const currentComment=resp.data[1].data.children.map((el: {data: []}) => el.data)

          const commentsData: ICommentData[]=[]
          for (let i = 0; i < (currentComment.length - 1); i++) {
            commentsData.push({
              id: currentComment[i].id,
              author: currentComment[i].author,
              text: currentComment[i].body,
              created_utc: currentComment[i].created_utc,
            })
          }

          if(commentsData !== undefined){
            setComments(commentsData);
          }
        })

        .catch((err) => {
          console.log(err)
        })
    }
  }, [token])

  return comments;
}


