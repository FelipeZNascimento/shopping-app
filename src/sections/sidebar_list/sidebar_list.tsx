import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isMobile } from "react-device-detect";
import { routes } from 'constants/routes';

// Selectors
import { selectShoppingList, selectIsLoading } from 'store/shopping_list/selector';

// Actions
import { fetchShoppingList, deleteFromShoppingList } from 'store/shopping_list/actions';

// Interfaces
import { TShoppingListItem } from 'constants/objectInterfaces';

// Components
import {
    InfoCard,
    Separator,
    Loading
} from 'components/index';
import {
    Remove as RemoveIcon
} from '@material-ui/icons';
import { IconButton, SwipeableDrawer } from '@material-ui/core';

import styles from './sidebar_list.module.scss';

const SidebarList = () => {
    const dispatch = useDispatch();
    const isLoading: boolean = useSelector(selectIsLoading);
    const list: TShoppingListItem[] = useSelector(selectShoppingList);
    const { pathname } = useLocation();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchShoppingList());
    }, []);

    const deleteProduct = (item: TShoppingListItem) => {
        dispatch(deleteFromShoppingList(item));
    };

    const onClick = () => {
        history.push(routes.SHOPPING_LIST);
    };

    const renderShoppingList = () => {
        return (
            <div className={styles.container}>
                <InfoCard
                    clickable
                    responsiveWidth
                    color={'orange'}
                    title={'Lista de Mercado'}
                    onClick={onClick}
                />
                <Separator />
                {
                    list.map((item: TShoppingListItem) => {
                        return (
                            <div className="bottom-padding-s">
                                <IconButton
                                    aria-label="remove"
                                    size="small"
                                    onClick={() => deleteProduct(item)}
                                >
                                    <RemoveIcon className="of-red" />
                                </IconButton>
                                <span className={styles.item}>{item.product.description}</span>
                            </div>
                        );
                    })
                }
                {isLoading && <Loading />}
            </div>
        );
    };

    if (!list || list.length === 0 || isMobile
        || pathname.includes(routes.SHOPPING_LIST)
        || pathname.includes(routes.NEW_PURCHASE)
        || pathname === routes.HOME
    ) {
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
