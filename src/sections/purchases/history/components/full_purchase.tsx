import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TPurchase } from '../types';

// Actions
import { fetchPurchase } from 'store/purchase/actions';

// Selectors
import {
    selectFullPurchase,
    selectIsLoading
} from 'store/purchase/selector';

// Components
import PurchaseCard from './purchase_card';
import FullPurchaseTable from './full_purchase_table';
import { Loading } from 'components/index';

import { invertSort } from 'utils/utils';
import {
    ISortingState
} from 'constants/objectInterfaces';
import styles from './full_purchase.module.scss';

type TProps = {
    purchase: TPurchase;
}

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const FullPurchase = ({
    purchase
}: TProps) => {
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);

    const dispatch = useDispatch();
    const fullPurchase = useSelector(selectFullPurchase);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchPurchase(purchase.id));
    }, []);

    const headers = [
        {
            key: 'quantity',
            value: 'Quantidade',
            sortable: false
        },
        {
            key: 'category_description',
            value: 'Categoria',
            sortable: true
        },
        {
            key: 'description',
            value: 'Produto',
            sortable: true
        },
        {
            key: 'brand',
            value: 'Marca',
            sortable: false
        },
        {
            key: 'price',
            value: 'Preço',
            sortable: true
        }
    ];

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchPurchase(purchase.id, { orderBy, sort: newSort }));
    };

    return (
        <div className={styles.container}>
            <PurchaseCard wide purchase={purchase} />
            <FullPurchaseTable
                bodyColumns={isLoading ? [] : fullPurchase}
                color="cyan"
                headerColumns={headers}
                isLoading={isLoading}
                sortState={currentSortState}
                onSortChange={onSortChange}
            />
            {isLoading && <Loading />}
        </div>
    );
};

export default FullPurchase;