import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../constants/routes';

const Menu = () => {
    const { pathname } = useLocation();
    // Marker on button whenever it's selected

    return (
        <div className="menu-container">
            <div className="buttons-container">
                <Link to={routes.SHOPPING_LIST}>
                    <div className="button">
                        Lista de Compras
                    </div>
                </Link>
                <Link to={routes.PLACES}>
                    <div className="button">
                        Lugares
                    </div>
                </Link>
                <Link to={routes.PLACES_CATEGORIES}>
                    <div className="button">
                        Categoria (Lugares)
                    </div>
                </Link>
                <Link to={routes.PRODUCTS}>
                    <div className="button">
                        Produtos
                    </div>
                </Link>
                <Link to={routes.PRODUCTS_CATEGORIES}>
                    <div className="button">
                        Categoria (Produtos)
                    </div>
                </Link>
                <Link to={routes.BRANDS}>
                    <div className="button">
                        Marcas
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Menu;