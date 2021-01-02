import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import { routes } from '../../constants/routes';
import { Button, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

interface menuItem {
    display: string;
    route: string;
}

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const menuItems: menuItem[] = [
        {
            display: 'Lista de Compras',
            route: routes.SHOPPING_LIST
        },
        {
            display: 'Registrar Compra',
            route: routes.PURCHASE_FORM
        },
        {
            display: 'Lugares',
            route: routes.PLACES
        },
        {
            display: 'Categoria (Lugares)',
            route: routes.PLACES_CATEGORIES
        },
        {
            display: 'Produtos',
            route: routes.PRODUCTS
        },
        {
            display: 'Categoria (Produtos)',
            route: routes.PRODUCTS_CATEGORIES
        },
        {
            display: 'Marcas',
            route: routes.BRANDS
        }
    ];

    const renderButton = (item: menuItem) => {
        const buttonClass = classNames({
            'button': isMobile,
            'button--regular': !isMobile,
            'button__selected': item.route === pathname
        });

        return (
            <div className={buttonClass} onClick={() => setIsMenuOpen(false)}>
                {item.display}
            </div>
        )
    };

    if (isMobile) {
        return (
            <>
                <div className="menu-container--mobile">
                    <div className="button align-left">
                        <Button
                            classes={{ root: 'of-white' }}
                            startIcon={<MenuIcon />}
                            onClick={() => setIsMenuOpen(true)}
                        >
                            Menu
                    </Button>
                    </div>
                </div>
                <Drawer anchor='left' open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <div className="drawer-container">
                        {menuItems.map((item) => (
                            <Link to={item.route}>
                                {renderButton(item)}
                                {/* <div className="button" onClick={() => setIsMenuOpen(false)}>
                                    {item.display}
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </Drawer>
            </>
        );
    }

    return (
        <div className="menu-container--regular">
            <div className="buttons-container">
                {menuItems.map((item) => (
                    <Link to={item.route}>
                        {renderButton(item)}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Menu;