import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import deleteItem from '../../services/dataDeleters';

// Selectors
import { shoppingList } from '../../store/shopping_list/selector';

// Actions
import { getShoppingList, removeFromList } from '../../store/shopping_list/actions';

// Interfaces
import { IShoppingListItem } from '../../constants/objectInterfaces';

// Components
import { Separator } from '../../components/index';
import {
    Clear as ClearIcon,
    Remove as RemoveIcon,
    Save as SaveIcon,
} from '@material-ui/icons';
import { IconButton, SwipeableDrawer } from '@material-ui/core';

import { objectTypes } from '../../constants/general';

const SidebarList = () => {
    const dispatch = useDispatch();
    const list: IShoppingListItem[] = useSelector(shoppingList);

    useEffect(() => {
        dispatch(getShoppingList());
    }, []);

    const deleteProduct = (product: IShoppingListItem) => {
        dispatch(deleteItem(product?.product_id, objectTypes.shoppingList));
        dispatch(removeFromList(product));
    };

    const renderShoppingList = () => {
        return (
            <div className="shopping-list__container padding-m">
                <p className="align-center of-green font-size-l">
                    Lista de Mercado
                </p>
                {/* <p className="margin-none">
                    <IconButton
                        aria-label="remove"
                        onClick={() => dispatch(clearShoppingList())}
                    >
                        <SaveIcon className="of-yellow" />
                    </IconButton>
                    <span className="left-padding-xs of-white font-size-m">Compra</span>
                </p>
                <p className="margin-none">
                    <IconButton
                        aria-label="remove"
                        onClick={() => dispatch(clearShoppingList())}
                    >
                        <SaveIcon className="of-orange" />
                    </IconButton>
                    <span className="left-padding-xs of-white font-size-m">Lista de Compras</span>
                </p>
                <p className="margin-none">
                    <IconButton
                        aria-label="remove"
                        onClick={() => dispatch(clearShoppingList())}
                    >
                        <ClearIcon className="of-red" />
                    </IconButton>
                    <span className="left-padding-xs of-white font-size-m">Limpar</span>
                </p> */}
                <Separator />
                {
                    list.map((product: IShoppingListItem) => {
                        return (
                            <div className="bottom-padding-s">
                                <IconButton
                                    aria-label="remove"
                                    size="small"
                                    onClick={() => deleteProduct(product)}
                                >
                                    <RemoveIcon className="of-red" />
                                </IconButton>
                                <span className="left-padding-xs of-white font-size-m">{product.description}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    };

    if (list.length === 0 || isMobile) {
        return null;
    }

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
    );
};

export default SidebarList;
