import React, { useCallback, useMemo } from 'react';

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

type TProps = {
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
}: TProps) => {
    const getCurrentUnit = useCallback(() => (
        productUnits.find((unit) => unit.id === purchaseItem.unit) || productUnits[0]
    ), [purchaseItem.unit]);

    console.log(`Rerendering item id ${purchaseItem.id}`);

    const renderContent = () => (
        <div>
            <div className={styles.cardElementContainer}>
                <Autocomplete
                    options={brands}
                    selected={purchaseItem.brand && purchaseItem.brand.id !== null ? purchaseItem.brand : null}
                    title="Marca"
                    onChange={(item: any) => onUpdate({
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
                        onChange={(e) => onUpdate({
                            ...purchaseItem,
                            quantity: parseFloat(e.target.value)
                        })}
                    />
                </div>
                <div className={styles.cardElement}>
                    <Autocomplete
                        options={productUnits}
                        selected={getCurrentUnit()}
                        title="Unidade"
                        onChange={(item: any) => {
                            onUpdate({
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
                        label={`€/${getCurrentUnit().description}`}
                        type="number"
                        value={purchaseItem.price}
                        onChange={(e) => onUpdate({
                            ...purchaseItem,
                            price: parseFloat(e.target.value),
                        })}
                    />
                </div>
                <div className={styles.promo}>
                    Promo?
                    <Checkbox
                        checked={purchaseItem.discount}
                        size="small"
                        inputProps={{ 'aria-label': 'checkbox with small size' }}
                        onChange={(e) => onUpdate({
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
                    value={purchaseItem.details}
                    onChange={(e) => onUpdate({
                        ...purchaseItem,
                        details: e.target.value
                    })}
                />
            </div>
        </div>
    );

    const memoizedContent = useMemo(renderContent, [getCurrentUnit(), purchaseItem]);

    const renderButton = () => (
        <IconButton
            aria-label="settings"
            onClick={() => onDelete(purchaseItem)}
        >
            <RemoveIcon classes={{ root: 'of-red' }} />
        </IconButton>
    )
    const renderFooter = () => {
        const totalPrice = purchaseItem.price > 0 && purchaseItem.quantity > 0
            ? Math.round(purchaseItem.price * purchaseItem.quantity * 100) / 100
            : 0;

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
            {memoizedContent}
        </InfoCard>
    );
};

const arePropsEqual = (prevItem: TProps, nextItem: TProps) => {
    return prevItem.purchaseItem.price === nextItem.purchaseItem.price
        && prevItem.purchaseItem.quantity === nextItem.purchaseItem.quantity
        && prevItem.purchaseItem.details === nextItem.purchaseItem.details
        && prevItem.purchaseItem.brand?.id === nextItem.purchaseItem.brand?.id
        && prevItem.purchaseItem.unit === nextItem.purchaseItem.unit
        && prevItem.purchaseItem.discount === nextItem.purchaseItem.discount;
};
  
export default React.memo(ProductCard, arePropsEqual);
