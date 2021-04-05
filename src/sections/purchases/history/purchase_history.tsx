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
import { InfoCard, Loading } from 'components/index';

import {
    IPurchase
} from 'constants/objectInterfaces';
import { routes } from 'constants/routes';
import styles from './purchase_history.module.scss';

const PurchaseHistory = () => {
    const [selectedPurchase, setSelectedPurchase] = useState<IPurchase | null>(null);
    const { purchaseId } = useParams<{ purchaseId: string }>();

    const purchaseHistory = useSelector(selectPurchaseHistory);
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

    const onClick = (purchase: IPurchase) => {
        history.push(routes.PURCHASE + `/${purchase.id}`);
    };

    const renderFooter = (purchase: IPurchase) => {
        return (
            <div className={styles.footer}>
                <div>{purchase.items} {purchase.items > 1 ? 'itens' : 'item'}</div>
                <div>€{purchase.total}</div>
            </div>
        )
    };

    if (selectedPurchase === null) {
        if (purchaseHistory.length === 0) {
            return (
                <div className={styles.noPurchase}>
                    <p>Nenhuma compra foi feita ainda!</p>
                </div>
            );
        }
        return (
            <div className={isMobile ? styles.containerMobile : styles.containerDesktop}>
                {isLoading && <Loading />}
                {!isLoading && purchaseHistory.map((purchase) => <InfoCard
                    title={purchase.description}
                    subtitle={moment(purchase.date).format('DD/MM/YYYY')}
                    renderFooter={() => renderFooter(purchase)}
                    onClick={() => onClick(purchase)}
                />)}
            </div>
        );
    }

    return (<FullPurchase purchase={selectedPurchase} />);
};

export default PurchaseHistory;
