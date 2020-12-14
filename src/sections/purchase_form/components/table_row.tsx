import React, { useEffect, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import { Remove as RemoveIcon } from '@material-ui/icons';
import { Autocomplete } from '../../../components/index';

import {
    IBrand,
    IPurchaseItem
} from '../../../constants/objectInterfaces';

interface IProps {
    brands: IBrand[],
    item: IPurchaseItem,
    lastRow: null | number,
    onDelete: (item: IPurchaseItem) => void;
    onUpdate: (item: IPurchaseItem) => void;
}

const TableRow = ({
    brands,
    item,
    lastRow,
    onDelete,
    onUpdate
}: IProps) => {
    const [itemInfo, setItemInfo] = useState(item);

    useEffect(() => {
        onUpdate(itemInfo);
    }, [itemInfo]);

    const productUnits = [
        {
            id: 0,
            description: 'un.'
        },
        {
            id: 1,
            description: 'kg'
        },
        {
            id: 2,
            description: 'ml'
        }
    ];

    return (
        <>
            <tr key={item.product_id}>
                <td className="align-left column-width-1">
                    <IconButton
                        aria-label="delete"
                        onClick={() => onDelete(item)}
                    >
                        <RemoveIcon classes={{ root: 'of-red' }} />
                    </IconButton>
                </td>
                <td className="column-width-2">{item.category_description}</td>
                <td className="column-width-2">{item.description}</td>
                <td className="column-width-2">
                    <Autocomplete
                        options={brands}
                        title="Marca"
                        // selected={itemInfo.brand_id
                        //     ? {
                        //         id: itemInfo.brand_id,
                        //         description: itemInfo.brand_description
                        //     }
                        //     : null
                        // }
                        onChange={(item: any) => setItemInfo({
                            ...itemInfo,
                            brand_description: item ? item.description : '',
                            brand_id: item ? item.id : null
                        })}
                    />
                </td>
                <td className="column-width-1">
                    <TextField
                        required
                        id="price"
                        InputProps={{ inputProps: { min: 0 } }}
                        label="Qtd."
                        type="number"
                        value={itemInfo.quantity}
                        onChange={(e) => setItemInfo({
                            ...itemInfo,
                            quantity: parseFloat(e.target.value)
                        })}
                    />
                </td>
                <td className="column-width-2">
                    <Autocomplete
                        options={productUnits}
                        selected={productUnits[itemInfo.unity]}
                        title="Unidade"
                        onChange={(item: any) => setItemInfo({
                            ...itemInfo,
                            unity: item.id
                        })}
                    />
                </td>
                <td className="column-width-1">
                    <TextField
                        required
                        // disabled={itemInfo.total_price > 0}
                        id="price"
                        InputProps={{ inputProps: { min: 0 } }}
                        label={`€/${productUnits[itemInfo.unity].description}`}
                        type="number"
                        value={itemInfo.price}
                        onChange={(e) => setItemInfo({
                            ...itemInfo,
                            price: parseFloat(e.target.value),
                        })}
                    />
                </td>
                <td className="column-width-1">
                    <TextField
                        required
                        // disabled={itemInfo.price > 0}
                        id="price"
                        InputProps={{ inputProps: { min: 0 } }}
                        label="€"
                        type="number"
                        value={itemInfo.total_price}
                        onChange={(e) => setItemInfo({
                            ...itemInfo,
                            total_price: parseFloat(e.target.value)
                        })}
                    />
                </td>
            </tr>
            {
                lastRow !== null
                && <tr className="of-grey3-bg">
                    <td colSpan={6} className="column-width-10">&nbsp;</td>
                    <td className="column-width-1">Total</td>
                    <td className="column-width-1">{lastRow.toFixed(2)}</td>
                </tr>
            }
        </>
    );
};

export default TableRow;
