import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import { CommentForm } from '../CommentForm/CommentForm';
import { CommentList } from '../CommentForm/CommentList';
import styles from './post.css';

interface IPost {
  title?: string;
  selftext?: string;
}

export function Post() {
  const ref = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [posts, setPosts] = useState<IPost>({title: '', selftext: ''});
  const id = document.location.href.split('/posts/')[1];
  const token = useSelector<RootState, string>(state => state.token.token);


  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        history.push('/posts')
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, []);

  useEffect(() => {
    const id = document.location.href.split('/posts/')[1];

    axios.get(`https://oauth.reddit.com/comments/${id}.json?sr_detail=true&limit=10`, {
      headers: {Authorization: `bearer ${token}`}
    })
      .then((resp) => {
        const post = resp.data;
          setPosts(post[0].data.children[0].data)
      })
      .catch(console.log)
  }, [])

  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={ref}>
      <h2 className={styles.title}>{posts.title}</h2>

      <div className={styles.content}>
        {posts.selftext}
        <CommentForm />
        <CommentList postId={id} />
      </div>


    </div>
  ), node);
}
