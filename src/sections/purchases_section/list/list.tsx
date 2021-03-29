import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// Actions
import { fetchPlaces } from 'store/place/actions';
import { savePurchaseList, removeFromList, updateList } from 'store/purchase/actions';

// Selectors
import { 
    getPurchaseList,
    hasError,
    isLoading
} from 'store/purchase/selector';
import { getPlaces } from 'store/place/selector';

// Components
import { Fab } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import {
    Autocomplete,
    Datepicker,
    Loading
} from 'components/index';
import PurchaseCard from './components/purchase_card';
import TotalPurchaseCard from './components/total_purchase_card';
import { IAutocompleteItem } from 'components/autocomplete/types';

// Interfaces, Constants
import { IPlace, IPurchaseItem } from 'constants/objectInterfaces';
import { routes } from 'constants/routes';

import styles from './list.module.scss';

const PurchaseList = () => {
    const [selectedDate, setSelectedDate] = useState<string>(moment().format());
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
    const [purchaseTotal, setPurchaseTotal] = useState<number>(0);
    const [isPurchaseSaved, setIsPurchaseSaved] = useState<boolean>(false);

    const purchaseList: IPurchaseItem[] = useSelector(getPurchaseList);
    const places: IPlace[] = useSelector(getPlaces);
    const formIsLoading: boolean = useSelector(isLoading);
    const formHasError: boolean = useSelector(hasError);
    const dispatch = useDispatch();
    const history = useHistory();
  
    useEffect(() => {
        dispatch(fetchPlaces());
    }, []);

    useEffect(() => {
        if(!formIsLoading && !formHasError && isPurchaseSaved) {
            setIsPurchaseSaved(false);
            setPurchaseTotal(0);
            setSelectedPlaceId(null);
            history.push(routes.SHOPPING_LIST);
        }
    }, [formHasError, formIsLoading]);

    const onSavePurchase = () => {
        dispatch(savePurchaseList(purchaseList, selectedDate, selectedPlaceId));
        setIsPurchaseSaved(true);
    };

    const getSum = (total: number, item: IPurchaseItem) => {
        if (isNaN(item.total_price)) {
            return total;
        }
        return total + item.total_price;
    };

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
        const totalSum = updatedPurchaseList.reduce(getSum, 0);
        setPurchaseTotal(totalSum);
        dispatch(updateList(updatedPurchaseList));
    };

    const onPlaceChange = (placeInput: IAutocompleteItem | string) => {
        console.log(placeInput);
        if (typeof placeInput === 'string') {
            setSelectedPlaceId(null);
        } else {
            setSelectedPlaceId(placeInput.id);
        }

    };

    if (formIsLoading) {
        return <Loading />;
    }

    const isFabButtonDisabled = !selectedPlaceId || !selectedDate || purchaseTotal === 0;
    return (
        <>
            <Fab
                classes={{ root: isFabButtonDisabled ? 'of-grey4-bg' : 'of-cyan-bg' }}
                className="fab-bottom"
                disabled={isFabButtonDisabled}
                size="large"
                variant="extended"
                onClick={onSavePurchase}
            >
                <SaveIcon />&nbsp;
                Salvar compra
            </Fab>
            <div className={`${styles.purchaseFormHeader} bottom-padding-l`}>
                <Autocomplete
                    freeSolo={false}
                    options={places}
                    title="Onde?"
                    onChange={onPlaceChange}
                />
                <Datepicker onChange={setSelectedDate} />
            </div>
            <div className={isMobile ? styles.purchaseCardContainerMobile : styles.purchaseCardContainerDesktop}>
                <TotalPurchaseCard
                    purchaseList={purchaseList}
                    total={purchaseTotal}
                />
                {purchaseList.map((item) =>
                    <PurchaseCard
                        item={item}
                        onDelete={removeItem}
                        onUpdate={onUpdate}
                    />)}
            </div>
        </>
    );
};

export default PurchaseList;
