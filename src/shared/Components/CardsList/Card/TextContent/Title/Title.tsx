import React from 'react';
import { Link } from 'react-router-dom';
import styles from './title.css';

export interface ITitle {
  title?: string,
  author?: string,
  id?: string,
  avatar?: string,
}

export function Title({ title, id }: ITitle) {
  return (
    <h2 className={styles.title} >
      <Link to={`/posts/${id}`} className={styles.postLink}>
        {title}
      </Link>
    </h2>
  );
}
