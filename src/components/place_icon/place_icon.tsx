import React from 'react';

import {
    Commute as CommuteIcon,
    ShoppingCart as ShoppingCartIcon,
    LocalMall as LocalMallIcon,
    Help as HelpIcon,
    Restaurant as RestaurantIcon,
    Deck as DeckIcon,
    LocalOffer as LocalOfferIcon,
    Fastfood as FastfoodIcon,
    Face as FaceIcon,
    Games as GamesIcon,
} from '@material-ui/icons';

type TProps = {
    categoryId: number;
}
const PlaceIcon = ({ categoryId }: TProps) => {
    switch (categoryId) {
        case 1:
            return <ShoppingCartIcon />;
        case 2:
            return <DeckIcon />;
        case 6:
            return <LocalMallIcon />;
        case 8:
            return <RestaurantIcon />;
        case 9:
            return <CommuteIcon />;
        case 11:
            return <FaceIcon />;
        case 13:
            return <GamesIcon />;
        case 14:
            return <FastfoodIcon />;
        case 15:
            return <LocalOfferIcon />;
        default:
            return <HelpIcon />;
    }
};

export default PlaceIcon;