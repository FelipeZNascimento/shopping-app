
import {
    faHammer,
    faQuestionCircle,
    faShoppingCart,
    faWineBottle,
} from '@fortawesome/free-solid-svg-icons';

import { objectTypes } from '../constants/general';
import { PlacesCategory } from '../constants/places';
import { ProductsCategory } from '../constants/products';

function returnIconPlaces(item) {
    switch (item.category_id) {
    case PlacesCategory.market:
        return faShoppingCart;
    case PlacesCategory.bricolage:
        return faHammer;
    default:
        return faQuestionCircle;
    }
}

function returnIconProducts(item) {
    switch (item.category_id) {
    case ProductsCategory.alcohol:
        return faWineBottle;
    default:
        return faQuestionCircle;
    }
}


export default function setIcons(array, objectType) {
    if (!array) {
        return;
    }

    if (objectType === objectTypes.places) {
        array.map((item) => {
            item.icon = returnIconPlaces(item);
        });
    }
    if (objectType === objectTypes.products) {
        array.map((item) => {
            item.icon = returnIconProducts(item);
        });
    }
}
