import React from 'react';
import { useComments } from '../../../../utils/react/hooks/useComments';
import { merge } from '../../../../utils/JS/merge';
import { generateId, generateRandomString } from '../../../../utils/react/generateRandomIndex';
import { GenericList } from '../../../UI/GenericList';
import { CommentItem } from '../CommentItem';
import styles from './commentlist.css';

export interface IComment {
  author?: string;
  id?: string;
  text?: string;
  karmaValue?: number;
  child?: IComment[];
  postId?: string;
}


export function CommentList({ postId }: IComment) {

  const comments = useComments(postId);
  if (!comments) return null;

  const genericComments = comments.map((comment) => {
    const COMMENTS = [
      {
        element: [<CommentItem author={comment.author} id={comment.id} createdAt={comment.created_utc} text={comment.text} key={comment.id}/>],
      }
    ].map(generateId)
    const handleItemClick = () => {}

    return (
      <GenericList
      list={COMMENTS.map(merge({ onClick: handleItemClick }))}
      key={generateRandomString()}
      />
    );
  })

  return (
    <ul className={styles.commentsList}>
      {genericComments}
    </ul>
  );
}

