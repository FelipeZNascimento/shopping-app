import React, { useEffect, useState } from 'react';

import {
    Checkbox,
    IconButton,
    TextField
} from '@material-ui/core';
import { Remove as RemoveIcon } from '@material-ui/icons';
import { Autocomplete, InfoCard } from 'components/index';

import { productUnits } from 'constants/products';
import {
    IBrand,
    IPurchaseItem
} from 'constants/objectInterfaces';
import styles from './product_card.module.scss';
import { objectsAreEqual } from 'services/utilities';

interface IProps {
    brands: IBrand[];
    color: string;
    purchaseItem: IPurchaseItem
    onDelete: (item: IPurchaseItem) => void;
    onUpdate: (item: IPurchaseItem) => void;
}

const ProductCard = ({
    brands,
    color,
    purchaseItem,
    onDelete,
    onUpdate
}: IProps) => {
    const [itemInfo, setItemInfo] = useState(purchaseItem);
    const [currentUnit, setCurrentUnit] = useState(productUnits[0]);

    useEffect(() => {
        if (!objectsAreEqual(itemInfo, purchaseItem)) {
            onUpdate(itemInfo);
            setCurrentUnit(productUnits.find((unit) => unit.id === purchaseItem.unit) || productUnits[0]);
        }
    }, [itemInfo]);

    const renderContent = () => (
        <div>
            <div className={styles.cardElementContainer}>
                <Autocomplete
                    options={brands}
                    title="Marca"
                    onChange={(item: any) => setItemInfo({
                        ...purchaseItem,
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
                        value={purchaseItem.quantity}
                        onChange={(e) => setItemInfo({
                            ...purchaseItem,
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
                                ...purchaseItem,
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
                        value={purchaseItem.price}
                        onChange={(e) => setItemInfo({
                            ...purchaseItem,
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
                            ...purchaseItem,
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
                        ...purchaseItem,
                        details: e.target.value
                    })}
                />
            </div>
        </div>
    );

    const renderButton = () => (
        <IconButton
            aria-label="settings"
            onClick={() => onDelete(purchaseItem)}
        >
            <RemoveIcon classes={{ root: 'of-red' }} />
        </IconButton>
    )
    const renderFooter = () => (
        <div className={purchaseItem.total_price > 0 ? styles.totalCardFooterValid : styles.totalCardFooter}>
            € {purchaseItem.total_price}
        </div>
    );

    return (
        <InfoCard
            color={color}
            title={purchaseItem.description}
            subtitle={purchaseItem.category_description}
            renderFooter={renderFooter}
            renderButton={renderButton}
        >
            {renderContent()}
        </InfoCard>
    );
};

export default ProductCard;
