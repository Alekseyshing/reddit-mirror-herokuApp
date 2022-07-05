import React from 'react';
import { getTimePass } from '../../../../../../utils/react/getTimePass';
import { hoursEnding } from '../../../../../../utils/react/hoursEnding';
import styles from './timecomment.css'

export interface ITimeCommentProps {
  createdAt: number;
}

export function TimeComment({ createdAt }: ITimeCommentProps) {
  const time = getTimePass(createdAt)

  return (
    <span className={styles.createdAt}>
      <span className={styles.publishedLabel}>Опубликовано </span>
      {`${time} ${time.toString().length <= 2 && hoursEnding(time)}`}
    </span>
  );
}
