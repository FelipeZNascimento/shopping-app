import React from 'react';
import { SectionCards } from '../../components/index';
import { routes } from '../../constants/routes';

const PurchaseSection = () => {
    const cards = [
        {
            title: 'Lista de Mercado',
            route: routes.SHOPPING_LIST,
            color: 'green'
        },
        {
            title: 'Nova Compra',
            route: routes.PURCHASE_FORM,
            color: 'cyan'
        },
        {
            title: 'Histórico de Compras',
            route: routes.PURCHASE_FORM,
            color: 'orange'
        }
    ];

    return (
        <SectionCards cards={cards} />
    );
};

export default PurchaseSection;