import React from 'react';
import styles from './threadtitle.css';
import logoReddit from '../../../../assets/images/logoReddit.png';

export function ThreadTitle() {
  return (
    <div className={styles.logo}>
      <img src={logoReddit} className={styles.logoImg} alt="Лого" />
    </div>
  );
}
