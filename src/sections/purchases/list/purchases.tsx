import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// Actions
import { fetchBrands } from 'store/brand/actions';
import { fetchPlaces } from 'store/place/actions';
import { savePurchaseList, removeFromList, updateList } from 'store/purchase/actions';

// Selectors
import {
    selectPurchaseList,
    selectHasError,
    selectIsLoading
} from 'store/purchase/selector';
import { selectBrands } from 'store/brand/selector';
import { selectPlaces } from 'store/place/selector';

// Components
import { Fab } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import {
    Autocomplete,
    Datepicker,
    InfoCard,
    Loading
} from 'components/index';
import ProductCard from './components/product_card';
import { IAutocompleteItem } from 'components/autocomplete/types';

// Interfaces, Constants
import { TBrand, TPlace, TPurchaseItem } from 'constants/objectInterfaces';
import { routes } from 'constants/routes';
import { dynamicSort } from 'utils/utils'

import styles from './purchases.module.scss';

type TCategoryCount = {
    description: string;
    count: number;
    total: number;
}

const PurchaseList = () => {
    const [selectedDate, setSelectedDate] = useState<string>(moment().format());
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
    const [purchaseTotal, setPurchaseTotal] = useState<number>(0);
    const [isPurchaseSaved, setIsPurchaseSaved] = useState<boolean>(false);

    const purchaseList: TPurchaseItem[] = useSelector(selectPurchaseList);
    const brands: TBrand[] = useSelector(selectBrands);
    const places: TPlace[] = useSelector(selectPlaces);
    const isLoading: boolean = useSelector(selectIsLoading);
    const hasError: boolean = useSelector(selectHasError);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchPlaces());
        dispatch(fetchBrands())
    }, []);

    useEffect(() => {
        if (!isLoading && !hasError && isPurchaseSaved) {
            setIsPurchaseSaved(false);
            setPurchaseTotal(0);
            setSelectedPlaceId(null);
            history.push(routes.PURCHASE_HISTORY);
        }
    }, [hasError, isLoading]);

    const onSavePurchase = () => {
        if (selectedPlaceId !== null) {
            const selectedPlace = places.find((place) => place.id === selectedPlaceId);

            if (selectedPlace !== undefined) {
                dispatch(savePurchaseList(purchaseList, selectedDate, selectedPlace, purchaseTotal));
                setIsPurchaseSaved(true);
            }
        }
    };

    const getSum = (total: number, item: TPurchaseItem) => {
        const totalPrice = Math.round(item.price * item.quantity * 100) / 100;
        if (isNaN(totalPrice)) {
            return total;
        }
        return total + totalPrice;
    };

    const onDelete = (item: TPurchaseItem) => {
        dispatch(removeFromList(item));
    };

    const onUpdate = (item: TPurchaseItem) => {
        const updatedPurchaseList = purchaseList.map((purchaseItem) => ({ ...purchaseItem }));
        const foundIndex = updatedPurchaseList.findIndex((purchaseItem) => purchaseItem.id === item.id);

        let totalPrice = Math.round(item.price * item.quantity * 100) / 100;

        if (foundIndex === -1) {
            return;
        }

        const foundItem = updatedPurchaseList[foundIndex];
        const foundItemTotalPrice = Math.round(foundItem.price * foundItem.quantity * 100) / 100;

        if (item.price !== foundItem.price && !isNaN(item.price)) {
            totalPrice = item.price > 0
                ? Math.round(item.price * item.quantity * 100) / 100
                : 0
        } else if (totalPrice !== foundItemTotalPrice && !isNaN(totalPrice)) {
            item.price = totalPrice > 0
                ? Math.round(totalPrice / item.quantity * 100) / 100
                : 0;
        } else if (item.quantity !== foundItem.quantity && !isNaN(item.quantity)) {
            totalPrice = item.price > 0
                ? Math.round(item.price * item.quantity * 100) / 100
                : 0;

            item.price = totalPrice > 0
                ? Math.round(totalPrice / item.quantity * 100) / 100
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

    if (isLoading) {
        return <Loading />;
    }
    const hasInvalidItem = purchaseList.find((item) => item.price <= 0 && item.quantity <= 0) !== undefined;
    const isFabButtonDisabled = !selectedPlaceId || !selectedDate || purchaseTotal === 0 || hasInvalidItem;

    const renderCategoriesTotal = () => {
        const allCategories: TCategoryCount[] = [];
        purchaseList
            .filter((item) => {
                const foundIndex = allCategories.findIndex((x) => (x.description === item.product.category.description));
                if (foundIndex <= -1) {
                    allCategories.push({
                        description: item.product.category.description,
                        count: 1,
                        total: Math.round(item.price * item.quantity * 100) / 100
                    });
                } else {
                    allCategories[foundIndex].count++;
                    allCategories[foundIndex].total += Math.round(item.price * item.quantity * 100) / 100;
                }
                return null;
            });

        return allCategories
            .sort(dynamicSort('description'))
            .map((item: TCategoryCount) => (
                <div className={styles.category}>
                    <div className={styles.title}>
                        {item.count}x {item.description}
                    </div>
                    <div className={styles.total}>
                        € {item.total}
                    </div>
                </div>
            ));
    }

    const renderFooter = () => {
        return (
            <div className={styles.totalCardFooter}>
                € {purchaseTotal}
            </div>
        );
    };

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
            <div className={styles.purchaseFormHeader}>
                <Autocomplete
                    freeSolo={false}
                    options={places}
                    title="Onde?"
                    onChange={onPlaceChange}
                />
                <Datepicker onChange={setSelectedDate} />
            </div>
            <div className={isMobile ? styles.purchaseCardContainerMobile : styles.purchaseCardContainerDesktop}>
                <InfoCard
                    title={'Total'}
                    subtitle={`${purchaseTotal} itens`}
                    renderFooter={renderFooter}
                >
                    {renderCategoriesTotal()}
                </InfoCard>
                {purchaseList.map((item, index) =>
                    <ProductCard
                        brands={brands}
                        color={index % 2 === 0 ? 'grey3' : 'grey4'}
                        purchaseItem={item}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />)}
            </div>
        </>
    );
};

export default PurchaseList;
