import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    IconButton,
    TextField
} from '@material-ui/core';
import { Remove as RemoveIcon } from '@material-ui/icons';

import { Autocomplete } from 'components/index';

import { getBrands } from 'store/brand/selector';
import { fetchBrands } from 'store/brand/actions';
import styles from './product_card.module.scss';

import {
    IBrand,
    IPurchaseItem
} from 'constants/objectInterfaces';

import { productUnits } from 'constants/products';

interface IProps {
    item: IPurchaseItem
    onDelete: (item: IPurchaseItem) => void;
    onUpdate: (item: IPurchaseItem) => void;
}

const ProductCard = ({
    item,
    onDelete,
    onUpdate
}: IProps) => {
    const [itemInfo, setItemInfo] = useState(item);
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

    const cardClass = classNames(
        [styles.card], {
        [styles.greenBorder]: itemInfo.total_price > 0
    });

    return (
        <Card className={cardClass}>
            <CardContent>
                <CardHeader
                    action={
                        <IconButton
                            aria-label="settings"
                            onClick={() => onDelete(item)}
                        >
                            <RemoveIcon classes={{ root: 'of-red' }} />
                        </IconButton>
                    }
                    classes={{
                        title: styles.title,
                        subheader: styles.subtitle
                    }}
                    title={item.description}
                    subheader={item.category_description}
                />
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
                    <div className={`${styles.cardElement} ${styles.flexCenter}`}>
                        Promo?
                        <Checkbox
                            size="small"
                            inputProps={{ 'aria-label': 'checkbox with small size' }}
                            onChange={(e) => setItemInfo({
                                ...itemInfo,
                                promotion: e.target.checked
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

            </CardContent>
            <CardActions className={styles.footer}>
                €{itemInfo.total_price}
            </CardActions>
        </Card>
    );
};

export default ProductCard;
