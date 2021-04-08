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
    TBrand,
    TPurchaseItem
} from 'constants/objectInterfaces';
import styles from './product_card.module.scss';
import { objectsAreEqual } from 'services/utilities';

interface IProps {
    brands: TBrand[];
    color: string;
    purchaseItem: TPurchaseItem
    onDelete: (item: TPurchaseItem) => void;
    onUpdate: (item: TPurchaseItem) => void;
}

const ProductCard = ({
    brands,
    color,
    purchaseItem,
    onDelete,
    onUpdate
}: IProps) => {
    const [itemInfo, setItemInfo] = useState<TPurchaseItem>(purchaseItem);
    const [currentUnit, setCurrentUnit] = useState(productUnits[0]);

    useEffect(() => {
        if (!objectsAreEqual(itemInfo, purchaseItem)) {
            onUpdate(itemInfo);
            setCurrentUnit(productUnits.find((unit) => unit.id === itemInfo.unit) || productUnits[0]);
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
                        brand: {
                            description: item ? item.description : '',
                            id: item ? item.id : null
                        }
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
    const renderFooter = () => {
        const totalPrice = Math.round(purchaseItem.price * purchaseItem.quantity * 100) / 100;
        return (
            <div className={totalPrice > 0 ? styles.totalCardFooterValid : styles.totalCardFooter}>
                € {totalPrice}
            </div>
        );
    }

    return (
        <InfoCard
            color={color}
            title={purchaseItem.product.description}
            subtitle={purchaseItem.product.category.description}
            renderFooter={renderFooter}
            renderButton={renderButton}
        >
            {renderContent()}
        </InfoCard>
    );
};

export default ProductCard;
