import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { getTimePass } from '../../../../utils/react/getTimePass';
import { hoursEnding } from '../../../../utils/react/hoursEnding';
import { EIconName, Icon } from '../../../UI/icons';
import styles from './commentitem.css';


interface ICommentItem {
  author?: string;
  id?: string;
  text?: string;
  createdAt?: number;
}


export function CommentItem({ author, text, createdAt }: ICommentItem) {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [comment, setComment] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);


  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsFormVisible(false);
    setComment(`${author}, `);
  }

  function handleReply() {
    setIsFormVisible(true)
    setTimeout(() => {
      setComment(`${author}, `);
      ref.current?.focus();
    }, 0)
  }

  return (
    <>
      {author ? createdAt ?
        <div className={styles.comment}>
          <div className={styles.commentNav}>
          <span className={styles.karmaCounter}>
            <button className={styles.up}>
              <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 0L0 10H19L9.5 0Z" fill="#D9D9D9" />
              </svg>
            </button>

            <button className={styles.down}>
              <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 10L19 0L8.74228e-07 -1.66103e-06L9.5 10Z" fill="#D9D9D9" />
              </svg>

            </button>
          </span>
          <img className={styles.avatar}  src="https://i.pravatar.cc/300" alt="AvatarComments" />
          <span className={styles.author}>{author}</span>
          <span className={styles.createdAt}>
            {`${getTimePass(createdAt)} ${getTimePass(createdAt).toString().length <= 2 && hoursEnding(getTimePass(createdAt))}`}
          </span>
          </div>
          <p className={styles.text}>{text}</p>
          <div className={styles.navBar}>
            <button className={styles.btnNav} onClick={handleReply}>
              <Icon name={EIconName.CommentIcon} size={14} />
              Ответить
            </button>
            <button className={styles.btnNav} >
              <Icon name={EIconName.ShareIcon} size={14} />
              Поделиться
            </button>
            <button className={styles.btnNav} >
              <Icon name={EIconName.WarningIcon} size={14} />
              Пожаловаться
            </button>
          </div>
          <div className={styles.formBlock}
            style={isFormVisible ? { display: 'flex' } : { display: 'none' }}>
            <form onSubmit={handleSubmit} className={styles.form} >
              <textarea onChange={handleChange} value={comment} className={styles.textarea} ref={ref}/>
              <button className={styles.btnComment} type='submit'>Ответить</button>
            </form>
          </div>
        </div>
        : null : null}
    </>

  );
}

