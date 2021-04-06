import React, { useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
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
import {
    GenericTable,
    InfoCard,
    Loading,
    PlaceIcon
} from 'components/index';

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
            renderFunction: () => 'Quantidade',
            sortable: false,
            showOnMobile: true
        },
        {
            key: 'category_description',
            renderFunction: () => 'Categoria',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: () => 'Produto',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'brand',
            renderFunction: () => 'Marca',
            sortable: false,
            showOnMobile: false
        },
        {
            key: 'price',
            renderFunction: () => 'Preço',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'total',
            renderFunction: () => 'Total',
            sortable: false,
            showOnMobile: false
        }
    ];

    const itemUnit = (item: IPurchaseItem) => productUnits.find((unit) => unit.id === item.unit);

    const bodyColumns = [
        {
            key: 'quantity',
            renderFunction: (item: IPurchaseItem) => <td className="align-left">{item.quantity} {itemUnit(item)?.description}</td>,
            showOnMobile: true
        },
        {
            key: 'category_description',
            renderFunction: (item: IPurchaseItem) => <td>{item.category_description}</td>,
            showOnMobile: false
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
            },
            showOnMobile: true
        },
        {
            key: 'brand_description',
            renderFunction: (item: IPurchaseItem) => <td>{item.brand_description || '-'}</td>,
            showOnMobile: false
        },
        {
            key: 'price',
            renderFunction: (item: IPurchaseItem) => <td className={item.discount ? 'of-green' : ''}>€ {item.price} / {itemUnit(item)?.description}</td>,
            showOnMobile: true
        },
        {
            key: 'total',
            renderFunction: (item: IPurchaseItem) => <td>€ {Math.round(item.price * item.quantity * 100) / 100}</td>,
            showOnMobile: false
        }
    ];

    const lastRow = () => {
        return (
            <tr>
                <td colSpan={isMobile ? 2 : 5}>
                    &nbsp;
            </td>
                <td className='align-left'>
                    € {purchase.total}
                </td>
            </tr>
        )
    };

    const renderIcon = (categoryId: number) => <PlaceIcon categoryId={categoryId} />

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchPurchase(purchase.id, { orderBy, sort: newSort }));
    };

    return (
        <div className={styles.container}>
            <InfoCard
                responsiveWidth
                subtitle={moment(purchase.date).format('DD/MM/YYYY')}
                title={purchase.description}
                renderButton={() => renderIcon(purchase.categoryId)}
            />
            <GenericTable
                bodyColumns={bodyColumns}
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