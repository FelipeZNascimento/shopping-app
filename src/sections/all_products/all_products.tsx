import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { addToList } from '../../store/shopping_list/actions';
import { fetchItems, fetchCategories } from '../../services/dataGetters';
import { setItem } from '../../services/dataSetters';
import deleteItem from '../../services/dataDeleters';

// Selectors
import { returnProducts } from '../../store/main/selector';
import { getShoppingList } from '../../store/shopping_list/selector';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Table } from '../../components/index';
import AddProductModal from './components/add_product_modal';
import DeleteProductModal from './components/delete_product_modal';

import { objectTypes } from '../../constants/general';
import { IProduct } from '../../constants/objectInterfaces';

const AllProducts = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<IProduct | null>(null);

    const dispatch = useDispatch();
    const products: IProduct[] = useSelector(returnProducts);
    const shoppingList: IProduct[] = useSelector(getShoppingList);

    useEffect(() => {
        dispatch(fetchItems(objectTypes.products))
        dispatch(fetchCategories(objectTypes.products))
    }, []);

    const headers = ['', 'Categoria', 'Nome'];

    const deleteProduct = () => {
        dispatch(deleteItem(toBeDeleted, objectTypes.products));
        setToBeDeleted(null);
    }

    const addNewProduct = (product: IProduct) => {
        dispatch(setItem([product], objectTypes.products));
        setIsAddProductOpen(false);
    };

    const addToCart = (product: IProduct) => {
        if (shoppingList.find((item) => item.id === product.id) === undefined) {
            dispatch(addToList(product));
        }
    };

    return (
        <>
            <Fab
                color="primary"
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
                isEditMode={false}
                onMainAction={(product: IProduct) => addToCart(product)}
                onSecondaryAction={(product: IProduct) => setToBeDeleted(product)}
            />
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

export default AllProducts;
