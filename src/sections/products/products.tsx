import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { removeFromList } from '../../store/main/actions';
import { addToList } from '../../store/shopping_list/actions';
import { fetchItems } from '../../services/dataGetters';
import { setItem, setProductToShoppingList } from '../../services/dataSetters';
import deleteItem from '../../services/dataDeleters';

// Selectors
import { isLoading, returnItems } from '../../store/main/selector';
import { getShoppingList } from '../../store/shopping_list/selector';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, Table } from '../../components/index';
import AddProductModal from './components/add_product_modal';
import DeleteProductModal from './components/delete_product_modal';

import { objectTypes } from '../../constants/general';
import { IProduct } from '../../constants/objectInterfaces';

const ProductsSection = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<IProduct | null>(null);

    const dispatch = useDispatch();
    const products: IProduct[] = useSelector((state) => returnItems(state, objectTypes.products));
    const shoppingList: IProduct[] = useSelector(getShoppingList);
    const isProductsLoading: boolean = useSelector(isLoading);

    useEffect(() => {
        dispatch(fetchItems(objectTypes.products))
    }, []);

    const headers = [
        {
            key: 'add_to_cart_icon',
            value: ''
        },
        {
            key: 'category_description',
            value: 'Categoria'
        },
        {
            key: 'description',
            value: 'Produto'
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
        console.log('Sorting by: ' + column + direction);
        dispatch(fetchItems(objectTypes.products, column, direction));
    };

    return (
        <>
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
            <Table
                bodyColumns={products}
                color="green"
                headerColumns={headers}
                onMainAction={(product: IProduct) => addToCart(product)}
                onSecondaryAction={(product: IProduct) => setToBeDeleted(product)}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
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

export default ProductsSection;
