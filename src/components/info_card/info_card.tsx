import React from 'react';
import classNames from 'classnames';

import styles from './info_card.module.scss';

type TProps = {
    children?: React.ReactNode;
    clickable?: boolean;
    color?: string;
    subtitle?: string;
    title: string;
    responsiveWidth?: boolean;
    renderButton?: null | (() => JSX.Element);
    renderFooter?: null | (() => JSX.Element);
    onClick?: null | (() => void);
}

const InfoCard = ({
    children = null,
    clickable = false,
    color = 'cyan',
    title,
    subtitle,
    responsiveWidth = false,
    renderButton = null,
    renderFooter = null,
    onClick = null
}: TProps) => {
    const onCardClick = () => {
        if (onClick !== null) {
            onClick();
        }
    };

    const cardClass = classNames(
        [styles[color]], {
        [styles.responsiveCard]: responsiveWidth,
        [styles.card]: !responsiveWidth,
        [styles.clickable]: clickable
    });

    const contentClass = classNames(
        [styles.content], {
        [styles.centerAligned]: children === null
    });

    return (
        <div className={cardClass} onClick={onCardClick}>
            <div className={contentClass}>
                {renderButton !== null &&
                    <div className={styles.button}>{renderButton()}</div>}
                <p className={styles.title}>{title}</p>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {children && <div className={styles.children}>{children}</div>}
            {renderFooter !== null &&
                <div className={styles.footer}>{renderFooter()}</div>}
        </div>
    );
};

export default InfoCard;
