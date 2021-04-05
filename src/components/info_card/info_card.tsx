import React from 'react';
import classNames from 'classnames';

import styles from './info_card.module.scss';

type TProps = {
    color?: string;
    subtitle?: string;
    title: string;
    wide?: boolean;
    renderFooter?: null | (() => JSX.Element);
    onClick?: null | (() => void);
}

const PurchaseCard = ({
    color = 'cyan',
    title,
    subtitle,
    wide = false,
    renderFooter = null,
    onClick = null
}: TProps) => {
    const onCardClick = () => {
        if (onClick !== null) {
            onClick();
        }
    };

    const cardClass = classNames({
        [styles.wideCard]: wide,
        [styles.card]: !wide,
        [styles.green]: color === 'green',
        [styles.cyan]: color === 'cyan',
        [styles.yellow]: color === 'yellow',
        [styles.pink]: color === 'pink',
    });

    return (
        <div className={cardClass} onClick={onCardClick}>
            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {!wide && renderFooter !== null &&
                <div className={styles.footer}>{renderFooter()}</div>}
        </div>
    );
};

export default PurchaseCard;
