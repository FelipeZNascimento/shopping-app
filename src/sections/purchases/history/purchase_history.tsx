import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";

// Selectors
import {
    selectIsLoading,
    selectPurchaseHistory
} from 'store/purchase/selector';

// Actions
import { fetchPurchases } from 'store/purchase/actions';

// Components
import PurchaseCard from './components/purchase_card';
import { Loading } from 'components/index';

import styles from './purchase_history.module.scss';

const PurchaseHistory = () => {
    const purchaseHistory = useSelector(selectPurchaseHistory);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPurchases());
    }, []);

    return (
        <div className={isMobile ? styles.containerMobile : styles.containerDesktop}>
            {isLoading && <Loading />}
            {purchaseHistory.map((purchase) => <PurchaseCard {...purchase} />)}
        </div>
    );
};

export default PurchaseHistory;
