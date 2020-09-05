import { connect } from 'react-redux';
import { NewPurchase } from './new_purchase';
import { fetchItems } from '../../services/dataGetters';
import { setItem, setPurchase } from '../../services/dataSetters';

import { objectTypes } from '../../constants/general';

import {
    errorMessage,
    isLoading,
    isSaving,
    hasError,
    returnItems,
} from '../../store/main/selector';

const mapDispatchToProps = (dispatch) => ({
    getAllPlaces: () => dispatch(fetchItems(objectTypes.places)),
    getAllBrands: () => dispatch(fetchItems(objectTypes.brands)),
    getAllProducts: () => dispatch(fetchItems(objectTypes.products)),
    saveNewPurchase: (
        purchase,
        date,
        place,
    ) => dispatch(setPurchase(purchase, date, place)),
    saveNewBrands: (item) => dispatch(setItem([item], objectTypes.brands)),
});

function mapStateToProps(state) {
    return {
        places: returnItems(state, objectTypes.places),
        brands: returnItems(state, objectTypes.brands),
        products: returnItems(state, objectTypes.products),
        error: hasError(state),
        errorMessage: errorMessage(state),
        loading: isLoading(state),
        saving: isSaving(state),
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewPurchase);
