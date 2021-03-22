import React from 'react';
import { SectionCards } from 'components/index';
import { routes } from 'constants/routes';

const ProductsSection = () => {
    const cards = [
        {
            title: 'Lista de Produtos',
            route: routes.PRODUCTS_LIST,
            color: 'green'
        },
        {
            title: 'Categorias',
            route: routes.PRODUCTS_CATEGORIES,
            color: 'blue'
        }
    ];

    return (
        <SectionCards cards={cards} />
    );
};

export default ProductsSection;