import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '../../components/index';
import Table from './components/table';

// Actions
import { removeFromList, updateList } from '../../store/purchase/actions';
import { fetchItems } from '../../services/dataGetters';

// Selectors
import { getPurchaseList } from '../../store/purchase/selector';
import { isLoading, returnItems } from '../../store/main/selector';

// Interfaces
import { IPurchaseItem } from '../../constants/objectInterfaces';
import { objectTypes } from '../../constants/general';

const PurchaseForm = () => {
    const dispatch = useDispatch();
    const purchaseList: IPurchaseItem[] = useSelector(getPurchaseList);

    const headers = [
        {
            key: 'category_description',
            value: 'Categoria'
        },
        {
            key: 'description',
            value: 'Produto',
        },
        {
            key: 'brand',
            value: '',
        },
        {
            key: 'quantity',
            value: '',
        },
        {
            key: 'unity',
            value: '',
        },
        {
            key: 'price',
            value: '',
        },
        {
            key: 'price_total',
            value: 'Total',
        }
    ];

    const removeItem = (item: IPurchaseItem) => {
        dispatch(removeFromList(item));
    };

    const onUpdate = (item: IPurchaseItem) => {
        const updatedPurchaseList = purchaseList.map((purchaseItem) => ({ ...purchaseItem }));
        const foundIndex = updatedPurchaseList.findIndex((purchaseItem) => purchaseItem.id === item.id);

        if (item.price !== updatedPurchaseList[foundIndex].price && !isNaN(item.price)) {
            item.total_price = item.price > 0
                ? Math.round(item.price * item.quantity * 100) / 100
                : 0
        } else if (item.total_price !== updatedPurchaseList[foundIndex].total_price && !isNaN(item.total_price)) {
            item.price = item.total_price > 0
                ? Math.round(item.total_price / item.quantity * 100) / 100
                : 0;
        } else if (item.quantity !== updatedPurchaseList[foundIndex].quantity && !isNaN(item.quantity)) {
            item.total_price = item.price > 0
                ? Math.round(item.price * item.quantity * 100) / 100
                : 0;

            item.price = item.total_price > 0
                ? Math.round(item.total_price / item.quantity * 100) / 100
                : 0;
        }

        updatedPurchaseList[foundIndex] = item;
        dispatch(updateList(updatedPurchaseList));
    };

    return (
        <>
            <Table
                bodyColumns={purchaseList}
                headerColumns={headers}
                onDelete={removeItem}
                onUpdate={onUpdate}
            />
        </>
    );
};

export default PurchaseForm;