import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

// Actions
import { removeFromList, getProducts } from 'store/main/actions';
import { addToList } from 'store/shopping_list/actions';
import { convertToPurchase } from 'store/purchase/actions';
import { setItem, setProductToShoppingList } from 'services/dataSetters';
import deleteItem from 'services/dataDeleters';

// Selectors
import { isLoading, returnItems } from 'store/main/selector';
import { shoppingList as listShopping } from 'store/shopping_list/selector';
import { getPurchaseListLength } from 'store/purchase/selector';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon, AddShoppingCart } from '@material-ui/icons';
import { Loading, Table } from 'components/index';
import AddProductModal from 'sections/products_section/list/components/add_product_modal';
import DeleteProductModal from 'sections/products_section/list/components/delete_product_modal';

import { routes } from 'constants/routes';
import { objectTypes } from 'constants/general';
import { IProduct } from 'constants/objectInterfaces';

const ProductsList = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<IProduct | null>(null);
    const [checkedProducts, setCheckedProducts] = useState<IProduct[]>([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const products: IProduct[] = useSelector((state) => returnItems(state, objectTypes.products));
    const shoppingList: IProduct[] = useSelector(listShopping);
    const isProductsLoading: boolean = useSelector(isLoading);
    const purchaseListLength: number = useSelector(getPurchaseListLength);

    useEffect(() => {
        dispatch(getProducts())
    }, []);

    const headers = [
        {
            key: 'category_description',
            value: 'Categoria',
            sortable: true
        },
        {
            key: 'description',
            value: 'Produto',
            sortable: true
        }
    ];

    const deleteProduct = () => {
        if (toBeDeleted) {
            dispatch(deleteItem(toBeDeleted.id, objectTypes.products));
            dispatch(removeFromList(toBeDeleted, objectTypes.products));
        }

        setToBeDeleted(null);
    }

    const addNewProduct = (product: IProduct) => {
        dispatch(setItem([product], objectTypes.products));
        setIsAddProductOpen(false);
    };

    const addToCart = (product: IProduct) => {
        if (shoppingList.find((item) => item.id === product.id) === undefined) {
            dispatch(addToList(product));
            dispatch(setProductToShoppingList(product.id));
        }
    };

    const onSortChange = (column: string, direction: string) => {
        dispatch(getProducts(column, direction));
    };

    const onCheckboxClick = (productList: IProduct[]) => {
        setCheckedProducts(productList);
    };

    const onConvertClick = () => {
        dispatch(convertToPurchase(checkedProducts, purchaseListLength));
        history.push(routes.PURCHASE_FORM);
    }

    const renderFab = () => {
        if (checkedProducts.length > 0) {
            return (
                <Fab
                    classes={{ root: 'of-cyan-bg' }}
                    className="fab-bottom"
                    size="large"
                    variant="extended"
                    onClick={onConvertClick}
                >
                    <AddShoppingCart />&nbsp;
                    Converter em compra
                </Fab>
            )
        }

        return (
            <Fab
                classes={{ root: 'of-green-bg' }}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddProductOpen(true)}
            >
                <AddIcon />&nbsp;
                Novo produto
            </Fab>
        );

    }

    return (
        <>
            {renderFab()}
            <Table
                bodyColumns={products}
                color="green"
                headerColumns={headers}
                onCheckboxAction={onCheckboxClick}
                onMainAction={addToCart}
                onSecondaryAction={setToBeDeleted}
                onSortChange={onSortChange}
            />
            {isProductsLoading && <Loading />}
            <AddProductModal
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onConfirm={addNewProduct}
            />
            <DeleteProductModal
                product={toBeDeleted}
                onClose={() => setToBeDeleted(null)}
                onConfirm={deleteProduct}
            />
        </>

    )
}

export default ProductsList;
