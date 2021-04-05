import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/pt-br';

// Actions
import { fetchPurchase } from 'store/purchase/actions';

// Selectors
import {
    selectFullPurchase,
    selectIsLoading
} from 'store/purchase/selector';

// Components
import { GenericTable, InfoCard, Loading } from 'components/index';

import {
    IPurchaseItem,
    ISortingState
} from 'constants/objectInterfaces';
import { TPurchase } from '../types';

import { invertSort } from 'utils/utils';
import { routes } from 'constants/routes';
import { productUnits } from 'constants/products';

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
        },
        {
            key: 'total',
            value: 'Total',
            sortable: false
        }
    ];

    const itemUnit = (item: IPurchaseItem) => productUnits.find((unit) => unit.id === item.unit);

    const bodyColumns = [
        {
            key: 'quantity',
            renderFunction: (item: IPurchaseItem) => <td className="align-left">{item.quantity} {itemUnit(item)?.description}</td>
        },
        {
            key: 'category_description',
            renderFunction: (item: IPurchaseItem) => <td>{item.category_description}</td>
        },
        {
            key: 'description',
            renderFunction: (item: IPurchaseItem) => {
                const renderItemDetails = () => {
                    if (item.details === '') {
                        return;
                    }

                    return <span>({item.details})</span>;
                };

                return (
                    <td>
                        <Link to={routes.PRODUCT + `/${item.product_id}`}>{item.description}</Link> {renderItemDetails()}
                    </td>
                )
            }
        },
        {
            key: 'brand_description',
            renderFunction: (item: IPurchaseItem) => <td>{item.brand_description || '-'}</td>
        },
        {
            key: 'price',
            renderFunction: (item: IPurchaseItem) => <td className={item.discount ? 'of-green' : ''}>€ {item.price} / {itemUnit(item)?.description}</td>
        },
        {
            key: 'total',
            renderFunction: (item: IPurchaseItem) => <td>€ {item.price * item.quantity}</td>
        }
    ];

    const lastRow = () => {
        return (
            <tr>
                <td colSpan={5}>
                    &nbsp;
            </td>
                <td className='align-left' colSpan={1}>
                    € {purchase.total}
                </td>
            </tr>
        )
    };

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchPurchase(purchase.id, { orderBy, sort: newSort }));
    };

    return (
        <div className={styles.container}>
            <InfoCard
                wide
                title={purchase.description}
                subtitle={moment(purchase.date).format('DD/MM/YYYY')}
            />
            <GenericTable
                bodyColumns={isLoading ? [] : bodyColumns}
                color="cyan"
                data={fullPurchase}
                headerColumns={headers}
                isLoading={isLoading}
                lastRow={lastRow}
                sortState={currentSortState}
                onSortChange={onSortChange}
            />
            {isLoading && <Loading />}
        </div>
    );
};

export default FullPurchase;