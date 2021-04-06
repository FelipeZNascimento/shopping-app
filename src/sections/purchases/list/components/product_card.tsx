import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
    Checkbox,
    IconButton,
    TextField
} from '@material-ui/core';
import { Remove as RemoveIcon } from '@material-ui/icons';

import { Autocomplete, InfoCard } from 'components/index';

import { getBrands } from 'store/brand/selector';
import { fetchBrands } from 'store/brand/actions';
import styles from './product_card.module.scss';

import {
    IBrand,
    IPurchaseItem
} from 'constants/objectInterfaces';

import { productUnits } from 'constants/products';

interface IProps {
    color: string;
    purchaseItem: IPurchaseItem
    onDelete: (item: IPurchaseItem) => void;
    onUpdate: (item: IPurchaseItem) => void;
}

const ProductCard = ({
    color,
    purchaseItem,
    onDelete,
    onUpdate
}: IProps) => {
    const [itemInfo, setItemInfo] = useState(purchaseItem);
    const [currentUnit, setCurrentUnit] = useState(productUnits[0]);
    const dispatch = useDispatch();

    const brands: IBrand[] = useSelector(getBrands);

    useEffect(() => {
        if (brands.length === 0) {
            dispatch(fetchBrands())
        }
    }, []);

    useEffect(() => {
        onUpdate(itemInfo);
        setCurrentUnit(productUnits.find((unit) => unit.id === itemInfo.unit) || productUnits[0]);
    }, [itemInfo]);

    const renderContent = () => (
        <div>
            <div className={styles.cardElementContainer}>
                <Autocomplete
                    options={brands}
                    title="Marca"
                    onChange={(item: any) => setItemInfo({
                        ...itemInfo,
                        brand_description: item ? item.description : '',
                        brand_id: item ? item.id : null
                    })}
                />
            </div>
            <div className={styles.cardElementContainer}>
                <div className={styles.cardElement}>
                    <TextField
                        required
                        id="price"
                        InputProps={{ inputProps: { min: 0 } }}
                        label="Qtd"
                        type="number"
                        value={itemInfo.quantity}
                        onChange={(e) => setItemInfo({
                            ...itemInfo,
                            quantity: parseFloat(e.target.value)
                        })}
                    />
                </div>
                <div className={styles.cardElement}>
                    <Autocomplete
                        options={productUnits}
                        selected={currentUnit}
                        title="Unidade"
                        onChange={(item: any) => {
                            setItemInfo({
                                ...itemInfo,
                                unit: item.id
                            })
                        }}
                    />
                </div>
            </div>
            <div className={styles.cardElementContainer}>
                <div className={styles.cardElement}>
                    <TextField
                        required
                        id="price"
                        InputProps={{ inputProps: { min: 0 } }}
                        label={`€/${currentUnit.description}`}
                        type="number"
                        value={itemInfo.price}
                        onChange={(e) => setItemInfo({
                            ...itemInfo,
                            price: parseFloat(e.target.value),
                        })}
                    />
                </div>
                <div className={styles.promo}>
                    Promo?
                        <Checkbox
                        size="small"
                        inputProps={{ 'aria-label': 'checkbox with small size' }}
                        onChange={(e) => setItemInfo({
                            ...itemInfo,
                            discount: e.target.checked
                        })}
                    />
                </div>
            </div>
            <div className={styles.cardElementContainer}>
                <TextField
                    fullWidth
                    id="details"
                    label="Detalhes"
                    type="text"
                    onChange={(e) => setItemInfo({
                        ...itemInfo,
                        details: e.target.value
                    })}
                />
            </div>
        </div>
    );

    const renderButton = () => (
        <IconButton
            aria-label="settings"
            onClick={() => onDelete(itemInfo)}
        >
            <RemoveIcon classes={{ root: 'of-red' }} />
        </IconButton>
    )
    const renderFooter = () => (
        <div className={itemInfo.total_price > 0 ? styles.totalCardFooterValid : styles.totalCardFooter}>
            € {itemInfo.total_price}
        </div>
    );

    return (
        <InfoCard
            color={color}
            title={itemInfo.description}
            subtitle={itemInfo.category_description}
            renderFooter={renderFooter}
            renderButton={renderButton}
        >
            {renderContent()}
        </InfoCard>
    );
};

export default ProductCard;
