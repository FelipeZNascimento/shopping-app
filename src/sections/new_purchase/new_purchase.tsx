import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import cloneDeep from 'lodash.clonedeep';

// Actions
import { fetchBrands } from 'store/brand/actions';
import { fetchPlaces } from 'store/place/actions';
import { savePurchaseList, removeFromList, updateItem } from 'store/purchase/actions';

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
import { dynamicSort, twoDecimals } from 'utils/utils'

import styles from './new_purchase.module.scss';

type TCategoryCount = {
    description: string;
    count: number;
    total: number;
}

const NewPurchase = () => {
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
        dispatch(fetchBrands(null))
    }, []);

    useEffect(() => {
        if (!isLoading && !hasError && isPurchaseSaved) {
            setIsPurchaseSaved(false);
            setPurchaseTotal(0);
            setSelectedPlaceId(null);
            history.push(routes.PURCHASE_HISTORY);
        }
    }, [hasError, isLoading]);

    useEffect(() => {
        const totalSum = purchaseList.reduce(getSum, 0);
        setPurchaseTotal(totalSum);
    }, [purchaseList]);

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
        const totalPrice = twoDecimals(parseFloat(item.price) * parseFloat(item.quantity));
        if (isNaN(totalPrice)) {
            return total;
        }
        return total + totalPrice;
    };

    const onDelete = (item: TPurchaseItem) => {
        dispatch(removeFromList(item));
    };

    const onUpdate = (item: TPurchaseItem) => {
        const foundIndex = purchaseList.findIndex((purchaseItem) => purchaseItem.id === item.id);
        dispatch(updateItem(cloneDeep(item), foundIndex));
    };

    const onPlaceChange = (placeInput: IAutocompleteItem | string) => {
        console.log(placeInput);
        if (typeof placeInput === 'string') {
            setSelectedPlaceId(null);
        } else {
            setSelectedPlaceId(placeInput.id);
        }

    };

    const hasInvalidItem = purchaseList.find((item) => parseFloat(item.price) <= 0 && parseFloat(item.quantity) <= 0) !== undefined;
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
                        total: twoDecimals(parseFloat(item.price) * parseFloat(item.quantity))
                    });
                } else {
                    allCategories[foundIndex].count++;
                    allCategories[foundIndex].total += twoDecimals(parseFloat(item.price) * parseFloat(item.quantity));
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
                        € {isNaN(item.total) ? '0' : twoDecimals(item.total).toFixed(2)}
                    </div>
                </div>
            ));
    }

    const renderFooter = () => {
        return (
            <div className={styles.totalCardFooter}>
                € {twoDecimals(purchaseTotal).toFixed(2)}
            </div>
        );
    };

    const renderProductCard = (item: TPurchaseItem, index: number) => (
        <ProductCard
            brands={brands}
            color={index % 2 === 0 ? 'grey3' : 'grey4'}
            purchaseItem={item}
            onDelete={onDelete}
            onUpdate={onUpdate}
        />
    );

    if (isLoading) {
        return <Loading />;
    }

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
                    subtitle={`${purchaseList.length} itens`}
                    renderFooter={renderFooter}
                >
                    {renderCategoriesTotal()}
                </InfoCard>
                {purchaseList.map(renderProductCard)}
            </div>
        </>
    );
};

export default NewPurchase;
