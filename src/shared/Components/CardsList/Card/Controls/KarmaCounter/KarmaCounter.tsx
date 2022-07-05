import React from 'react';
import styles from './karmacounter.css';

export interface IKarmaValueProps{
  karmaValue?: number;
}

export function KarmaCounter({karmaValue}: IKarmaValueProps) {
  return (
    <div className={styles.karmaCounter}>
    <button className={styles.up}>
      <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 0L0 10H19L9.5 0Z" fill="#D9D9D9" />
      </svg>
    </button>
    <span className={styles.karmaValue}>{karmaValue}</span>
    <button className={styles.down}>
      <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 10L19 0L8.74228e-07 -1.66103e-06L9.5 10Z" fill="#D9D9D9" />
      </svg>
    </button>
  </div>
  );
}
