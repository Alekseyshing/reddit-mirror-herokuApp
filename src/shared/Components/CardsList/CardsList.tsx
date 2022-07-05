import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { merge } from '../../../utils/JS/merge';
import { generateId } from '../../../utils/react/generateRandomIndex';
import { GenericList } from '../../UI/GenericList';
import { Card } from './Card/Card';
import styles from './cardslist.css';
import postsPlug from '../../../assets/images/postsPlugImg.png';
import avatarPlug from '../../../assets/images/avatarPlug.png';
import { PostListPlug } from './PostListPlug';
import { CARD_LIST_REF } from '../../../utils/react/constants';

export function CardsList() {
  const [posts, setPosts] = useState<any[]>([]);
  const token = useSelector<RootState, string>(state => state.token.token);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const [nextAfter, setNextAfter] = useState('');
  const bottomOfList = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [more, setMore] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true)
      setErrorLoading('')
      try {
        if (token && token.length > 0 && token != "undefined") {
          const { data: { data: { after, children } } } = await axios.get(CARD_LIST_REF, {
            params: {
              limit: 10,
              after: nextAfter,
            }
          });

          setNextAfter(after)
          setPosts(prevChildren => prevChildren.concat(...children))
        }

      } catch (error) {
        setErrorLoading(String(error))
      }

      setLoading(false)
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (counter < 2) {
          load()
          setCounter(counter + 1)
        } else {
          setMore(true)
        }
      }
    }, {
      rootMargin: '10px',
    })

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current)
    }

    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current)
      }
    }
  },
    [bottomOfList.current, nextAfter, token, more]
  )

  function showMore() {
    setCounter(0)
    setMore(false)
  }

  const genericPosts = posts?.map((post) => {
    if (post.data.preview?.images[0]?.source.url === undefined) return;

    if (post.data.preview?.images[0]?.source.url.includes('external-preview') && post.data.preview?.images[0]?.source.url != undefined) {
      post.data.preview.images[0].source.url = postsPlug;
    }
    if (post.data.sr_detail?.icon_img === null || post.data.sr_detail?.icon_img === '') {
      post.data.sr_detail.icon_img = avatarPlug;
    }

    const POSTS = [
      {
        element: [<Card preview={post.data?.preview?.images[0]?.source?.url.replace("&amp;", "&").split(';')[0].split(',')[0]} title={post.data.title} author={post.data.author} url={post.data.url} key={post.data.id} cardNumber={post.data.cardNumber} id={post.data.id} commentsNumber={post.data.commentsNumber} karmaValue={post?.data?.score} createdAt={post.data.created_utc} avatar={post.data.sr_detail?.icon_img} subreddit={post.data.subreddit} />],
        className: `${styles.cardsList}`,
      }
    ].map(generateId)

    const handleItemClick = () => { }

    return (
      <GenericList
        list={POSTS.map(merge({ onClick: handleItemClick }))}
        key={POSTS.map(merge({ onClick: handleItemClick }))[0].id}
      />
    );
  })
  return (
    <ul>
      {posts?.length === 0 && token === "undefined" && (
        <PostListPlug />
      )}

      {posts?.length === 0 && !loading && !errorLoading && token != "undefined" && (
        <div style={{ textAlign: 'center' }}>Нет ни одного поста</div>
      )}

      {genericPosts}

      {loading && (
        <div style={{ textAlign: 'center' }}>
          Загрузка...
        </div>
      )}

      <div ref={bottomOfList} />

      {errorLoading && (
        <div role="alert" style={{ textAlign: 'center' }}>
          {errorLoading}
        </div>
      )}

      <button onClick={showMore} className={styles.moreBtn} style={more ? { display: 'block' } : { display: 'none' }}>Загрузить ещё</button>
    </ul>
  )
}

