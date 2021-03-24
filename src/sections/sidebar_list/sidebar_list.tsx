import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import { routes } from 'constants/routes';

// Selectors
import { shoppingList } from 'store/shopping_list/selector';

// Actions
import { fetchShoppingList, deleteFromShoppingList } from 'store/shopping_list/actions';

// Interfaces
import { IShoppingListItem } from 'constants/objectInterfaces';

// Components
import { Separator } from 'components/index';
import {
    Remove as RemoveIcon
} from '@material-ui/icons';
import { IconButton, SwipeableDrawer } from '@material-ui/core';

import styles from './sidebar_list.module.scss';

const SidebarList = () => {
    const dispatch = useDispatch();
    const list: IShoppingListItem[] = useSelector(shoppingList);
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(fetchShoppingList());
    }, []);

    const deleteProduct = (product: IShoppingListItem) => {
        dispatch(deleteFromShoppingList(product));
    };

    const renderShoppingList = () => {
        return (
            <div className={styles.container}>
                <Link to={routes.SHOPPING_LIST}>
                    <p className={styles.title}>
                        Lista de Mercado
                    </p>
                </Link>
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
                                <span className={styles.item}>{product.description}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    };

    if (!list || list.length === 0 || isMobile || pathname.includes(routes.SHOPPING_LIST)) {
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
