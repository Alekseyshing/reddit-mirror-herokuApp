import React from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../Content';
import styles from './nomatch.css';

export function NoMatch() {
  return (
    <Content>
      <div className={styles.root}>
        <h1 style={{ textAlign: 'center', padding: '350px 0', height:'100vh' }}>404-Страница не найдена. <Link className={styles.link} to="/">Вернуться на главную</Link></h1>
      </div>
    </Content>
  );
}
