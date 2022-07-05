import React from 'react';
import styles from './Icon.css';
import { CommentIcon } from './CommentIcon';
import { ShareIcon } from './ShareIcon';
import classNames from 'classnames';
import { BlockIcon } from './BlockIcon';
import { SaveIcon } from './SaveIcon';
import { WarningIcon } from './WarningIcon';
import { IconAnon } from './IconAnon';

export enum EIconName {
  CommentIcon = 'CommentIcon',
  ShareIcon = 'ShareIcon',
  BlockIcon = 'BlockIcon',
  SaveIcon = 'SaveIcon',
  WarningIcon = 'WarningIcon',
  IconAnon = 'AnonIcon'
}

export type TIconSizes = 20 | 18 | 16 | 14 | 12 | 10;

interface IIconProps {
  name: EIconName;
  size?: TIconSizes;
  As?: 'svg';
  children?: React.ReactNode;
}

export function Icon(props: IIconProps) {
  const {
    As = 'svg',
    name = 'CommentIcon',
    size = 14,
    children,
  } = props;

  const classes = classNames(
    styles[`s${size}`],
  )

  return (
        <As className={classes}>
            {
            props.name === EIconName.CommentIcon ? <CommentIcon /> :
            props.name === EIconName.ShareIcon ? <ShareIcon /> :
            props.name === EIconName.BlockIcon ? <BlockIcon /> :
            props.name === EIconName.SaveIcon ? <SaveIcon /> :
            props.name === EIconName.WarningIcon ? <WarningIcon /> :
            props.name === EIconName.IconAnon ? <IconAnon /> : ''
            }
        </As>
  )
}
