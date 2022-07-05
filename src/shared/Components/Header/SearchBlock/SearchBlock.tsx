import React from 'react';
import styles from './searchblock.css';
import { UserBlock } from './UserBlock';
import { useUserData } from '../../../../utils/react/hooks/useUserData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';


export function SearchBlock() {

  const { data, loading } = useUserData();
  const token = useSelector<RootState, string>(state => state.token.token);


  return (
    <div>
      {token && token.length > 0 && token != "undefined"
        ? <div className={styles.searchBlock} onClick={e => e.preventDefault()}>
          <UserBlock avatarSrc={data.iconImg} username={data.name} loading={loading} />
        </div>
        : <div className={styles.searchBlock} >
          <UserBlock avatarSrc={data.iconImg} username={data.name} loading={loading} />
        </div>
      }
    </div>
  );
}
