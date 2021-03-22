import React from 'react';

import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
} from '@material-ui/core';

import styles from './purchase_card.module.scss';

import { IPurchaseItem } from 'constants/objectInterfaces';

interface IProps {
    purchaseList: IPurchaseItem[];
    total: number;
}

interface ICategoryCount {
    description: string;
    count: number;
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
                count: 1
            });
        } else {
            allCategories[foundIndex].count++;
        }
        return null;
    });

    const renderCategory = (item: ICategoryCount) => {
        return (
            <div className={styles.cardElementContainer}>
                <div className={styles.cardElement}>
                    {item.description}
                </div>
                <div className={styles.cardElement}>
                    {item.count}
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
