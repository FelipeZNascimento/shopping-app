import React from 'react';
import { Link } from 'react-router-dom';

import { InfoCard } from 'components/index';
import { routes } from 'constants/routes';
import styles from './home.module.scss';

const HomeSection = () => {
    const cards = [
        {
            title: 'Lista de Mercado',
            route: routes.SHOPPING_LIST,
            color: 'cyan'
        },
        {
            title: 'Nova Compra',
            route: routes.PURCHASE_FORM,
            color: 'cyan'
        },
        {
            title: 'Histórico de Compras',
            route: routes.PURCHASE_HISTORY,
            color: 'cyan'
        },
        {
            title: 'Lista de Lugares',
            route: routes.PLACES_LIST,
            color: 'yellow'
        },
        {
            title: 'Categorias de Lugares',
            route: routes.PLACES_CATEGORIES,
            color: 'yellow'
        },
        {
            title: 'Lista de Produtos',
            route: routes.PRODUCTS_LIST,
            color: 'green'
        },
        {
            title: 'Categorias de Produtos',
            route: routes.PRODUCTS_CATEGORIES,
            color: 'green'
        },
        {
            title: 'Marcas',
            route: routes.BRANDS,
            color: 'pink'
        }
    ];

    return (
        <div className={styles.container}>
            {cards.map((card) => (
                <Link to={card.route}>
                    <InfoCard
                        color={card.color}
                        title={card.title}
                    />
                </Link>
            ))}
        </div>
    );
}

export default HomeSection;
