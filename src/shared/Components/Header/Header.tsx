import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import styles from './header.css';
import { SearchBlock } from './SearchBlock';
import { ThreadTitle } from './ThreadTitle';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { saveToken } from '../../../redux/actions/token/actions';
import { useLoaded } from '../../../utils/react/hooks/useLoaded';



function HeaderComponent() {
  const dispatch = useDispatch();
  const loaded = useLoaded();

  useEffect(() => {
    dispatch<any>(saveToken())
  }, [])


  return (
    <header className={styles.header}>
      {loaded &&
        <ThreadTitle />
      }
      <SearchBlock />
    </header>
  );
}
export const Header = hot(HeaderComponent);



