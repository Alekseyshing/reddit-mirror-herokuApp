import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from '../../../../UI/Dropdown';
import styles from './menu.css';
import { EColors, Text } from '../../../../UI/Text'
import { GenericList } from '../../../../UI/GenericList';
import { generateId } from '../../../../../utils/react/generateRandomIndex';
import { merge } from '../../../../../utils/JS/merge';
import { Icon, EIconName, MenuIcon } from '../../../../UI/icons';


interface IMenu {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const DROPDOWNMENU = [{
  element: <>
    <Icon size={14} key={EIconName.CommentIcon} name={EIconName.CommentIcon}></Icon>
    <span>Комментарии</span>
  </>,
  className: `${styles.menuItem} ${styles.menuItemInactive}`,
  onClick: () => console.log('Комментарии'),
},
{
  element: <div key={'123'}></div>,
  className: `${styles.divider}`,
},
{
  element: <>
    <Icon size={14} key={EIconName.ShareIcon} name={EIconName.ShareIcon}></Icon>
    <span>Поделиться</span>
  </>,
  className: `${styles.menuItem} ${styles.menuItemInactive}`,
  onClick: () => console.log('Поделиться'),
},
{
  element: <div key={'1234'}></div>,
  className: `${styles.divider}`,
},
{
  element: <>
    <Icon size={14} key={EIconName.BlockIcon} name={EIconName.BlockIcon}></Icon>
    <span>Скрыть</span>
  </>,
  className: `${styles.menuItem}`,
  onClick: () => console.log('Скрыть'),
},
{
  element: <div key={'12345'}></div>,
  className: `${styles.divider}`,
},
{
  element:
    <>
      <Icon size={14} key={EIconName.SaveIcon} name={EIconName.SaveIcon}>
      </Icon><span>Сохранить</span>
    </>,
  className: `${styles.menuItem} ${styles.menuItemInactive}`,
  onClick: () => console.log('Сохранить'),
},
{
  element: <div key={'321'}></div>,
  className: `${styles.divider}`,
},
{
  element: <>
    <Icon size={14} key={EIconName.WarningIcon} name={EIconName.WarningIcon}></Icon>
    <span>Пожаловаться</span>
  </>,
  className: `${styles.menuItem}`,
  onClick: () => console.log('Пожаловаться'),
},
].map(generateId)

const NOOP = () => { };

export function Menu({ isOpen, onClose = NOOP, onOpen = NOOP, }: IMenu) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = ref.current?.getBoundingClientRect();
  const [list, setlist] = React.useState(DROPDOWNMENU)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen)

  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen])
  React.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen])

  const [dropdownPos, setDropdownPos] = useState({
    position: '',
    top: 0,
    left: 0,
  })

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpen = (e: any) => {
    if (e.target instanceof HTMLElement && isOpen === undefined) {
      setIsDropdownOpen(true)
    }

    if (rect) {
      setDropdownPos({
        position: 'absolute',
        top: 0,
        left: 0,
      });
    }

    setDropdownPos({
      position:'absolute',
      left: e.pageX - 95,
      top: e.pageY + 20
    })
  }

  const handleItemClick = (id: string) => {
    setlist(list.filter((item) => item.id != id))
  }

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }

  }, []);

  return (
    <div className={styles.menu} ref={ref}>
      <div onClick={handleOpen} className={styles.menuButton}>
        <MenuIcon />
      </div>
      {isDropdownOpen && (
        <Dropdown
          parent={ref}
          className={styles.list}
          position={dropdownPos.position}
          positionTop={dropdownPos.top}
          positionLeft={dropdownPos.left}

          dropdownList={
            <GenericList
              list={list.map(merge({ onClick: handleItemClick }))}
              key={list.map(merge({ onClick: handleItemClick }))[0].id}
            />
          }
          children={
            <button className={styles.closeButton} onClick={handleOpen}>
              <Text mobileSize={12} size={14} color={EColors.grey66}>Закрыть</Text>
            </button>
          }
        ></Dropdown>
      )}
    </div>
  );
}
