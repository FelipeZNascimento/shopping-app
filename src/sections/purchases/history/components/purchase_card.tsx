import React from 'react';
import styles from '../purchase_history.module.scss';
import moment from 'moment';
import 'moment/locale/pt-br';

type TProps = {
    id: number;
    date: string;
    total: number;
    description: string;
    items: number;
};

const PurchaseCard = ({
    id,
    date,
    total,
    description,
    items
}: TProps) => {
    moment.locale('pt-BR');

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <p className={styles.place}>{description}</p>
                <p className={styles.date}>{moment(date).format('DD/MM/YYYY')}</p>
            </div>
            <div className={styles.footer}>
                <div>{items} {items > 1 ? 'itens' : 'item'}</div>
                <div>€{total}</div>
            </div>
        </div>
    );
};

export default PurchaseCard;
