import React from 'react';
import { Break } from '../../../../UI/Break'
import { EColors, Text } from '../../../../UI/Text';
import { IconAnon } from '../../../../UI/icons';
import styles from './userblock.css';
import { USER_BLOCK_REF } from '../../../../../utils/react/constants';

interface IUserBlockProps {
  avatarSrc?: string,
  username?: string,
  loading?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {

  return (
    <a
      href={ USER_BLOCK_REF }
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc}  alt="Аватар" className={styles.avatarImage} />
          : <IconAnon />
        }
      </div>

      <div className={styles.username} >
        <Break size={12} />
        {loading ? (
          <Text size={20} color={EColors.grey99}>Загрузка...</Text>
        ) : (
          <Text size={20} color={username ? EColors.black : EColors.grey99}>{username || 'Аноним'}</Text>
        )}
      </div>
    </a>
  );
}
