import React from 'react';
import styles from './purchase_card.module.scss';
import moment from 'moment';
import 'moment/locale/pt-br';
import { TPurchase } from '../types';

type TProps = {
    purchase: TPurchase;
    wide?: boolean;
    onClick?: null | ((purchase: TPurchase) => void);
}

const PurchaseCard = ({
    purchase,
    wide = false,
    onClick = null
}: TProps) => {
    moment.locale('pt-BR');
    const {
        date,
        total,
        description,
        items
    } = purchase;

    const onCardClick = () => {
        if (onClick !== null) {
            onClick(purchase);
        }
    };

    return (
        <div className={wide ? styles.wideCard : styles.card} onClick={onCardClick}>
            <div className={styles.content}>
                <p className={styles.place}>{description}</p>
                <p className={styles.date}>{moment(date).format('DD/MM/YYYY')}</p>
            </div>
            {!wide && <div className={styles.footer}>
                <div>{items} {items > 1 ? 'itens' : 'item'}</div>
                <div>€{total}</div>
            </div>}
        </div>
    );
};

export default PurchaseCard;
