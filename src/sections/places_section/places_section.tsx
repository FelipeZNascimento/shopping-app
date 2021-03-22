import React from 'react';
import { SectionCards } from 'components/index';
import { routes } from 'constants/routes';

const PlacesSection = () => {
    const cards = [
        {
            title: 'Lista de Lugares',
            route: routes.PLACES_LIST,
            color: 'yellow'
        },
        {
            title: 'Categorias',
            route: routes.PLACES_CATEGORIES,
            color: 'orange'
        }
    ];

    return (
        <SectionCards cards={cards} />
    );
};

export default PlacesSection;