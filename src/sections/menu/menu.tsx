import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from "react-device-detect";

import { routes } from '../../constants/routes';
import { Button, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
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

    const { pathname } = useLocation();
    // Marker on button whenever it's selected

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
                                <div className="button" onClick={() => setIsMenuOpen(false)}>
                                    {item.display}
                                </div>
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
                        <div className="button--regular">
                            {item.display}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Menu;