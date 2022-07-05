import React from 'react';
import styles from './break.css';
import classNames from 'classnames';

type TBreakSize = 4 | 8 | 12 | 16 | 20;
type TDisplays = 'mobile' | 'tablet' | 'desktop';

interface IBreakProps {
    size: TBreakSize;
    mobileSize?: TBreakSize;
    tabletSize?: TBreakSize;
    desktopSize?: TBreakSize;
    inline?: boolean;
    top?: boolean;
}


export function Break(props: IBreakProps) {
    const {
        inline = false,
        top = false,
        size,
        mobileSize,
        tabletSize,
        desktopSize
    } = props;

    return (
        <div
            className={classNames(
                styles[`s${size}`],
                { [styles[`mobile_s${mobileSize}`]]: mobileSize },
                { [styles[`tablet_s${tabletSize}`]]: tabletSize },
                { [styles[`desktop_s${desktopSize}`]]: desktopSize },
                { [styles.inline]: inline },
                { [styles.top]: top },
            )}
        ></div>
    )
}
