import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Selectors
import { getShoppingList } from '../../store/shopping_list/selector';

// Actions
import { removeFromList } from '../../store/shopping_list/actions';

// Interfaces
import { IProduct } from '../../constants/objectInterfaces';

import { Remove as RemoveIcon } from '@material-ui/icons';
import { IconButton, SwipeableDrawer } from '@material-ui/core';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const shoppingList: IProduct[] = useSelector(getShoppingList);

    const renderShoppingList = () => {
        return (
            <div className="shopping-list__container padding-m">
                <p className="align-center">Lista de Produtos</p>
                {
                    shoppingList.map((product: IProduct) => {
                        return (
                            <div className="bottom-padding-s">
                                <IconButton
                                    aria-label="remove"
                                    onClick={() => dispatch(removeFromList(product))}
                                >
                                    <RemoveIcon className="of-red" />
                                </IconButton>
                                <span className="left-padding-xs">{product.description}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    };

    return (
        <SwipeableDrawer
            anchor="right"
            onClose={() => null}
            onOpen={() => null}
            open={true}
            variant="persistent"
        >
            {renderShoppingList()}
        </SwipeableDrawer>
        // <div className="shopping-list__container">
        //     {shoppingList}
        // </div>
    );
};

export default ShoppingList;
