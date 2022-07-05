import React from 'react';
import styles from './card.css';
import { Controls, IControlsProps } from './Controls';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

export interface ICardProps {
  author?: string;
	title?: string;
	url?: string;
	permalink?: string;
	preview?: string;
  id?:string;
  cardNumber?:number,
  commentsNumber?: any,
  karmaValue?: number,
  createdAt?: number,
  avatar?: string,
  subreddit?: string,
}

export function Card({ title, preview='', url, author, id, commentsNumber, karmaValue, createdAt, avatar }: ICardProps) {
  return (
    <div className={styles.card} key={id}>
      <TextContent id={id} title={title} url={url} author={author} createdAt={createdAt} avatar={avatar}/>
      <Preview img={preview} />
      <Menu />
      <Controls karmaValue={karmaValue} commentsNumber={commentsNumber}   />
    </div>
  );
}
