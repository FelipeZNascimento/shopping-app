import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from "react-device-detect";
import moment from 'moment';
import 'moment/locale/pt-br';

// Selectors
import {
    selectIsLoading,
    selectPurchaseHistory
} from 'store/purchase/selector';

// Actions
import { fetchPurchases } from 'store/purchase/actions';

// Components
import FullPurchase from './components/full_purchase';
import { InfoCard, Loading, PlaceIcon } from 'components/index';

import { TPurchase } from 'constants/objectInterfaces';

import { routes } from 'constants/routes';
import styles from './purchase_history.module.scss';

const PurchaseHistory = () => {
    const [selectedPurchase, setSelectedPurchase] = useState<TPurchase | null>(null);
    const { purchaseId } = useParams<{ purchaseId: string }>();

    const purchaseHistory: TPurchase[] = useSelector(selectPurchaseHistory);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchPurchases());
    }, []);

    useEffect(() => {
        if (purchaseId && !isLoading && purchaseHistory.length > 0) {
            const currentPurchase = purchaseHistory.find((purchase) => purchase.id === parseInt(purchaseId));
            if (currentPurchase !== undefined) {
                setSelectedPurchase(currentPurchase);
            } else {
                history.push(routes.PURCHASE_HISTORY);
            }
        }
    }, [purchaseHistory]);

    const onClick = (purchase: TPurchase) => {
        history.push(routes.PURCHASE + `/${purchase.id}`);
    };

    const renderIcon = (categoryId: number | null) => <PlaceIcon categoryId={categoryId} />

    const renderFooter = (purchase: TPurchase) => (
        <div className={styles.footer}>
            <div>{purchase.numberOfItems} {purchase.numberOfItems > 1 ? 'itens' : 'item'}</div>
            <div>€{purchase.total}</div>
        </div>
    );

    if (selectedPurchase === null) {
        if (purchaseHistory.length === 0 && !isLoading) {
            return (
                <div className={styles.noPurchase}>
                    <p>Nenhuma compra foi feita ainda!</p>
                </div>
            );
        }
        return (
            <div className={isMobile ? styles.containerMobile : styles.containerDesktop}>
                {isLoading && <Loading />}
                {!isLoading && purchaseHistory.map((purchase: TPurchase) => <InfoCard
                    clickable
                    title={purchase.place.description}
                    subtitle={moment(purchase.date).format('DD/MM/YYYY')}
                    renderButton={() => renderIcon(purchase.place.category.id)}
                    renderFooter={() => renderFooter(purchase)}
                    onClick={() => onClick(purchase)}
                />)}
            </div>
        );
    }

    return (<FullPurchase purchase={selectedPurchase} />);
};

export default PurchaseHistory;
