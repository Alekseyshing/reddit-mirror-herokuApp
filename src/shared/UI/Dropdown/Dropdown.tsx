import React from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.css';

interface IDropdownProps {
  children: React.ReactNode;
  dropdownList: React.ReactNode;
  position?: string;
  positionLeft?: number;
  positionTop?: number;
  className: string;
  style?: React.CSSProperties;
  parent: React.RefObject<HTMLDivElement>
}

export function Dropdown({ children, dropdownList, positionLeft, positionTop }: IDropdownProps) {

  const node = document.querySelector('#dropdown_root');
  if (!node) return null;


  return ReactDOM.createPortal(
    <div className={styles.dropdown} style={{
      top: positionTop,
      left: positionLeft
    }}>
      <ul className={styles.menuItemsList}>{dropdownList}</ul>
      {children}
    </div>,
    node
  )
}



