import React from 'react';

import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
} from '@material-ui/core';

import styles from './product_card.module.scss';

import { IPurchaseItem } from 'constants/objectInterfaces';

interface IProps {
    purchaseList: IPurchaseItem[];
    total: number;
}

interface ICategoryCount {
    description: string;
    count: number;
    total: number;
}

const TotalPurchaseCard = ({
    purchaseList,
    total
}: IProps) => {
    const allCategories: ICategoryCount[] = [];
    purchaseList.filter((item) => {
        const foundIndex = allCategories.findIndex((x) => (x.description === item.category_description));
        if (foundIndex <= -1) {
            allCategories.push({
                description: item.category_description,
                count: 1,
                total: Math.round(item.price * item.quantity * 100) / 100
            });
        } else {
            allCategories[foundIndex].count++;
            allCategories[foundIndex].total+= Math.round(item.price * item.quantity * 100) / 100;
        }
        return null;
    });

    const renderCategory = (item: ICategoryCount) => {
        return (
            <div className={`${styles.cardElementContainer} ${styles.dottedBorder}`}>
                <div className={`${styles.cardElement} ${styles.leftAlign}`}>
                    [{item.count}] {item.description}
                </div>
                <div className={`${styles.cardElement} ${styles.rightAlign}`}>
                    €{item.total}
                </div>
            </div>
        )
    };

    return (
        <Card className={styles.totalCard}>
            <CardContent className={styles.cardElement}>
                <CardHeader
                    classes={{
                        title: styles.title,
                        subheader: styles.subtitle
                    }}
                    title='Total'
                    subheader={`${purchaseList.length} itens`}
                />
                {allCategories.map((item) => renderCategory(item))}
            </CardContent>
            <CardActions className={styles.footer}>
                €{total}
            </CardActions>
        </Card>
    );
};

export default TotalPurchaseCard;
