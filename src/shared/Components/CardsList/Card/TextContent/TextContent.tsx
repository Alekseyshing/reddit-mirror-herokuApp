import React from 'react';
import styles from './textcontent.css';
import { TimeComment } from './TimeComment';
import { Title } from './Title';


export interface ITextContentProps {
  title?: string,
  author?: string,
  url?: string,
  createdAt?: any,
  avatar?: string,
  id?: string;
  subreddit?:string;
}

export function TextContent({ title, author, avatar, createdAt, id }: ITextContentProps) {
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <div className={styles.userLink}>
          <div>
            <img className={styles.avatar} src={avatar} alt="Аватар" />
          </div>
          <a href="#user-url" className={styles.username}>{author}</a>
        </div>
        <TimeComment createdAt={createdAt} />
      </div>
      <Title id={id} title={title} author={author} avatar={avatar}/>
    </div>
  );
}
