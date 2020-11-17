import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    FormControlLabel,
    IconButton,
    TextField,
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { Autocomplete } from '../index';

import setIcons from '../../utils/fontAwesomeIconMapper';

import { objectTypes } from '../../constants/general';
import { productObjectModel } from '../../constants/products';


export class PurchaseTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: [JSON.parse(JSON.stringify(productObjectModel))],
            nextIndex: 1,
        };
    }

    render() {
        const {
            addLine,
            brands,
            handleChange,
            products,
            purchase,
            removeLine,
        } = this.props;

        const disabledAddButton = purchase.length <= 1;

        setIcons(products, objectTypes.products);

        const renderPurchaseLines = () => {
            return purchase.map((purchaseLine) => (
                <tr key={purchaseLine.id}>
                    <td className={purchaseLine.invalid ? 'purchase-table--invalid' : ''}>
                        <IconButton
                            aria-label="add to shopping cart"
                            disabled={disabledAddButton}
                            onClick={() => removeLine(purchaseLine)}
                        >
                            <DeleteIcon classes={{ root: !disabledAddButton ? 'of-red' : '' }} />
                        </IconButton>
                    </td>
                    <td>
                        <Autocomplete
                            required
                            id="product"
                            options={products}
                            onChange={(e, product) => handleChange(e, purchaseLine, product, 'product')}
                            title="Nome"

                        />
                    </td>
                    <td>
                        <Autocomplete
                            id="brand"
                            options={brands}
                            onChange={(e, brand) => handleChange(e, purchaseLine, brand, 'brand')}
                            title="Marca"
                        />
                    </td>
                    <td>
                        <TextField
                            required
                            id="quantity"
                            InputProps={{ inputProps: { min: 0 } }}
                            label="Unidades/Peso"
                            type="number"
                            value={purchaseLine.quantity}
                            onChange={(e) => handleChange(e, purchaseLine, purchaseLine.product, 'product')}
                        />
                    </td>
                    <td>
                        <TextField
                            required
                            color="secondary"
                            id="price"
                            InputProps={{ inputProps: { min: 0 } }}
                            label="€"
                            type="number"
                            value={purchaseLine.price}
                            onChange={(e) => handleChange(e, purchaseLine, purchaseLine.product, 'product')}
                        />
                    </td>
                    <td>
                        <FormControlLabel
                            classes={{ root: 'new-purchase--product-line-discount align-center' }}
                            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                            id="discount"
                            value={purchaseLine.discount}
                            onChange={(e) => handleChange(e, purchaseLine, !purchaseLine.discount, 'discount')}
                        />
                    </td>
                    <td>€{(purchaseLine.total)}</td>
                </tr>
            ));
        };

        const renderTotal = () => {
            const totalSum = purchase.reduce((total, obj) => obj.total + total, 0);
            return (
                <>
                    <tr>
                        <td colSpan="6">
                            &nbsp;
                        </td>
                        <td className="bold">
                            €{totalSum.toFixed(2)}
                        </td>
                    </tr>
                </>
            );
        };

        return (
            <div className="new-purchase--table-container">
                <form autoComplete="off">
                    <table className="new-purchase--table">
                        <thead className="of-green-bg">
                            <tr>
                                <th className="new-purchase--table-add">
                                    <IconButton
                                        aria-label="add to shopping cart"
                                        onClick={addLine}
                                    >
                                        <AddShoppingCartIcon classes={{ root: 'of-darkcolor' }} />
                                    </IconButton>
                                </th>
                                <th className="new-purchase--table-product">Produto</th>
                                <th className="new-purchase--table-brand">Marca</th>
                                <th className="new-purchase--table-quantity">Quantidade</th>
                                <th className="new-purchase--table-price">Preço</th>
                                <th className="new-purchase--table-discount">Promoção</th>
                                <th className="new-purchase--table-total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderPurchaseLines()}
                            {renderTotal()}
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

PurchaseTable.propTypes = {
    addLine: PropTypes.func.isRequired,
    removeLine: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    brands: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    })),
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    })),
    purchase: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        product: PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        }),
        brand: PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        }),
        quantity: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        discount: PropTypes.bool.isRequired,
        total: PropTypes.number.isRequired,
    })),

};

PurchaseTable.defaultProps = {
    brands: null,
    products: null,
    purchase: null,
};

export default PurchaseTable;
