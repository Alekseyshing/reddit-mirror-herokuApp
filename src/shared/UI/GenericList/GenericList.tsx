import React from 'react';


interface IItem {
  id: string,
  className?: string,
  As?: 'a' | 'li' | 'button' | 'div',
  href?: string,
  element?: React.ReactNode,
  onClick?: (id: string) => void,
}

interface IGenericListProps {
  list: IItem[];
  className?: string;
}

const noop = () => {};

export function GenericList({ list }: IGenericListProps){

  return (
    <React.Fragment>
    {list.map(({ As = 'li', element, onClick = noop, className, id, href }) => (
      <As
        className={className}
        onClick={() => onClick(id)}
        href={href}
        key={id}
        id={id}
      >
        {element}
      </As>
    ))}
    </React.Fragment>
  );
}

const jsxs = [
  <li key={0}>Content 0</li>,
  <li key={1}>Content 1</li>,
  <li key={2}>Content 2</li>,
  <li key={3}>Content 3</li>,
  <li key={4}>Content 4</li>
]
