import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import moment from 'moment';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SaveIcon from '@material-ui/icons/Save';

import {
    Button,
} from '@material-ui/core';

import {
    Autocomplete,
    Datepicker,
    Loading,
    PurchaseTable,
    Separator,
} from '../../components/index';

// import setIcons from '../../utils/fontAwesomeIconMapper';

import { objectTypes } from '../../constants/general';
import { productObjectModel } from '../../constants/products';

export class NewPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextIndex: 1,
            purchase: [JSON.parse(JSON.stringify(productObjectModel))],
            selectedDate: moment().valueOf(),
            selectedPlace: null,
            newBrands: [],
            newProducts: [],
        };

        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewLine = this.addNewLine.bind(this);
        this.removeLine = this.removeLine.bind(this);
        this.checkPurchase = this.checkPurchase.bind(this);
    }

    componentDidMount() {
        const {
            getAllBrands,
            getAllPlaces,
            getAllProducts,
            brands,
            places,
            products,
        } = this.props;

        if (brands.length === 0) {
            getAllBrands();
        }
        if (places.length === 0) {
            getAllPlaces();
        }
        if (products.length === 0) {
            getAllProducts();
        }
    }


    onChangeDate = function (dateString) {
        this.setState({
            selectedDate: moment(dateString).valueOf(),
        });
    }

    onChangePlace = function (event, option) {
        this.setState({
            selectedPlace: option,
        });
    }

    handleChange = function (evt, purchaseLine, itemObject, targetObjectName) {
        const { purchase } = this.state;
        const itemIndex = purchase.findIndex((p) => p.id === purchaseLine.id);
        let updatedPurchase;

        if (itemObject || itemObject === null) {
            updatedPurchase = update(purchase, {
                [itemIndex]: {
                    [targetObjectName]: {
                        $set: itemObject,
                    },
                },
            });
        }

        if (targetObjectName === 'product') {
            const { id, value } = evt.target;
            let factor = null;

            if (id === 'quantity') {
                factor = purchase[itemIndex].price;
            } else if (id === 'price') {
                factor = purchase[itemIndex].quantity;
            }

            if (factor !== null) {
                updatedPurchase[itemIndex].total = value * factor;
                updatedPurchase[itemIndex][id] = value;
            }
        }

        if (updatedPurchase) {
            this.setState({
                purchase: updatedPurchase,
            });
        }
    };

    addNewLine = function () {
        const { nextIndex, purchase } = this.state;
        const newProduct = productObjectModel;
        newProduct.id = nextIndex;

        const updatedPurchase = update(purchase, {
            $push: [JSON.parse(JSON.stringify(newProduct))],
        });

        this.setState({
            purchase: updatedPurchase,
            nextIndex: nextIndex + 1,
        });
    }

    removeLine = function (line) {
        const { purchase } = this.state;
        const productIndex = purchase.findIndex((p) => p.id === line.id);

        const updatedPurchase = update(purchase, {
            $splice: [[productIndex, 1]],
        });

        this.setState({
            purchase: updatedPurchase,
        });
    }

    checkFormValidation = function () {
        const { purchase } = this.state;
        let isFormValid = true;

        purchase.forEach((element) => {
            element.invalid = (
                element.price === ''
                || element.quantity === ''
                || (element.product === null
                    || (Object.keys(element.product).length === 0
                        && element.product.constructor === Object))
                || (element.total === 0)
            );

            if (element.invalid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    checkPurchase = function () {
        const { purchase, selectedDate, selectedPlace } = this.state;
        const { saveNewPurchase } = this.props;

        // if (newBrands.length > 0) {
        //     saveNewBrands(newBrands);
        // };

        saveNewPurchase(purchase, selectedDate, selectedPlace.id);
    }

    render() {
        const {
            brands,
            places,
            products,
            loading,
            saving,
        } = this.props;

        const {
            purchase,
            // newBrands,
            // newProducts,
            selectedDate,
            selectedPlace,
        } = this.state;

        // setIcons(places, objectTypes.places);
        const isFormValid = this.checkFormValidation();
        const saveDisabled = !selectedDate || selectedPlace === null || !isFormValid;
        const loadingText = loading
            ? 'Loading...'
            : 'Saving...';

        return (
            <>
                {(loading || saving)
                    && (
                        <Loading
                            fullscreen
                            text={loadingText}
                        />
                    )}
                <h1>Nova Compra</h1>
                <div className="new-purchase--form-container">
                    <div className="new-purchase--form-content">
                        <Autocomplete
                            options={places}
                            title="Onde?"
                            onChange={this.onChangePlace}
                        />
                    </div>
                    <div className="new-purchase--form-content">
                        <Datepicker onChange={this.onChangeDate} />
                    </div>
                </div>
                <PurchaseTable
                    brands={brands}
                    products={products}
                    purchase={purchase}
                    addLine={this.addNewLine}
                    handleChange={this.handleChange}
                    removeLine={this.removeLine}
                />
                <Separator />
                <Button
                    disableElevation
                    color="primary"
                    size="large"
                    classes={{ root: 'button--valid' }}
                    startIcon={<AddShoppingCartIcon />}
                    variant="outlined"
                    onClick={this.addNewLine}
                >
                    Nova Linha
                </Button>
                <Button
                    disableElevation
                    disabled={saveDisabled}
                    color="primary"
                    size="large"
                    classes={{ root: 'button--valid' }}
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={this.checkPurchase}
                >
                    Salvar
                </Button>
            </>
        );
    }
}

NewPurchase.propTypes = {
    brands: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    })),
    places: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        category_id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    })),
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        category_id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    })),

    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    saving: PropTypes.bool,

    getAllBrands: PropTypes.func.isRequired,
    getAllPlaces: PropTypes.func.isRequired,
    getAllProducts: PropTypes.func.isRequired,
    saveNewPurchase: PropTypes.func.isRequired,
    saveNewBrands: PropTypes.func.isRequired,
};

NewPurchase.defaultProps = {
    brands: null,
    places: null,
    products: null,
    error: false,
    errorMessage: null,
    loading: false,
    saving: false,
};

export default NewPurchase;
