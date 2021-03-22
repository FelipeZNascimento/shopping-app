import React from 'react';
import { Link } from 'react-router-dom';

import styles from './section_cards.module.scss';

type TCard = {
    color: string,
    title: string,
    route: string
}

type TProps = {
    cards: TCard[]
}

const SectionCards = ({
    cards
}: TProps) => {
    return (
        <div className={styles.container}>
            {cards.map((card) => (
                <Link to={card.route}>
                    <div className={styles[card.color]}>
                        {card.title}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SectionCards;