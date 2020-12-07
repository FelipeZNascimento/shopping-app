import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteItem from '../../services/dataDeleters';

// Selectors
import { getShoppingList, isLoading } from '../../store/shopping_list/selector';

// Actions
import { clearShoppingList, removeFromList } from '../../store/shopping_list/actions';
import { fetchItems } from '../../services/dataGetters';

// Interfaces
import { IShoppingListItem } from '../../constants/objectInterfaces';

// Components
import { Loading, Table } from '../../components/index';
import { Remove as RemoveIcon, Clear as ClearIcon, Close as CloseIcon } from '@material-ui/icons';
import { Fab } from '@material-ui/core';

import { objectTypes } from '../../constants/general';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const shoppingList: IShoppingListItem[] = useSelector(getShoppingList);
    const isListLoading: boolean = useSelector(isLoading);
    const headers = [
        {
            key: 'category_description',
            value: 'Categoria'
        },
        {
            key: 'description',
            value: 'Produto'
        }
    ];

    useEffect(() => {
        console.log('Fetching...');
        dispatch(fetchItems(objectTypes.shoppingList));
    }, []);


    if (shoppingList.length === 0) {
        return null;
    }

    const deleteProduct = (product: IShoppingListItem) => {
        dispatch(deleteItem(product?.product_id, objectTypes.shoppingList));
        dispatch(removeFromList(product));
    };

    const onSortChange = (column: string, direction: string) => {
        console.log('Sorting by: ' + column + direction);
        dispatch(fetchItems(objectTypes.shoppingList, column, direction));        
    };

    return (
        <>
            <Fab
                classes={{ root: 'of-red-bg' }}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => dispatch(clearShoppingList())}
            >
                <CloseIcon />&nbsp;
                Limpar lista
            </Fab>
            {isListLoading && <Loading />}
            <Table
                bodyColumns={shoppingList}
                color="green"
                headerColumns={headers}
                onSecondaryAction={(product: IShoppingListItem) => deleteProduct(product)}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
            />
        </>
    );
};

export default ShoppingList;
