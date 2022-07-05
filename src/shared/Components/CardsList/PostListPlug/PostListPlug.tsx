import React from 'react';
import styles from './postlistplug.css';
import postsPlug from '../../../../assets/images/postsListPlug.png'
import monocle from '../../../../assets/images/monocle.png'
import { GenericList } from '../../../UI/GenericList';
import { generateId, generateRandomString } from '../../../../utils/react/generateRandomIndex';

export function PostListPlug() {

  const postListPlug = [
    {
      element: <img src={postsPlug} alt="Посты не загружены" />,
      className: `${styles.plugListItem}`,
    },
    {
      element: <img src={postsPlug} alt="Посты не загружены" />,
      className: `${styles.plugListItem}`,
    },
    {
      element: <img src={postsPlug} alt="Посты не загружены" />,
      className: `${styles.plugListItem}`,
    },
    {
      element: <img src={postsPlug} alt="Посты не загружены" />,
      className: `${styles.plugListItem}`,
    },
    {
      element: <img src={postsPlug} alt="Посты не загружены" />,
      className: `${styles.plugListItem}`,
    }
  ].map(generateId)


  return (

    <div>
      <ul className={styles.plugList}>
        <GenericList list={postListPlug} key={generateRandomString()} />
      </ul>
      <div className={styles.monocleBox}>
        <img className={styles.monocleImg} src={monocle} alt="Монокл" />
        <p className={styles.text}>Хмм...здесь пока пусто</p>
      </div>
    </div>
  );
}
