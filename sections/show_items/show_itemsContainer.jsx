import { connect } from 'react-redux';
import { setItem, updateItems } from '../../services/dataSetters';
import { fetchCategories, fetchItems } from '../../services/dataGetters';
import deleteItem from '../../services/dataDeleters';
import * as ReduxActions from '../../store/main/actions';
import ShowItems from './show_items';

import * as ObjectModels from '../../constants/objectModels';

import {
    errorMessage,
    isAddMode,
    isDeleting,
    isEditMode,
    isSaveMode,
    isLoading,
    hasError,
    returnCategories,
    returnItems,
} from '../../store/main/selector';

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteItem: (item) => dispatch(deleteItem(item, ownProps.objectType)),
    getCategories: () => (fetchCategories(ownProps.objectType)
        ? dispatch(fetchCategories(ownProps.objectType))
        : null),
    getAllItems: () => dispatch(fetchItems(ownProps.objectType)),
    resetErrors: () => dispatch(ReduxActions.clearErrors()),
    saveNewItem: (item) => dispatch(setItem([item], ownProps.objectType)),
    toggleAddMode: (status) => dispatch(ReduxActions.toggleAddMode(status)),
    toggleEditMode: (status) => dispatch(ReduxActions.toggleEditMode(status)),
    toggleSaveMode: (status) => dispatch(ReduxActions.toggleSaveMode(status)),
    updateItems: (items) => dispatch(setItem(items, ownProps.objectType)),
});

function mapStateToProps(state, ownProps) {
    return {
        categories: returnCategories(state, ownProps.objectType),
        objectType: ownProps.objectType,
        errorMessage: errorMessage(state),
        items: returnItems(state, ownProps.objectType),
        isAddMode: isAddMode(state),
        isDeleting: isDeleting(state),
        isEditMode: isEditMode(state),
        isError: hasError(state),
        isLoading: isLoading(state),
        isSaveMode: isSaveMode(state),
        objectModel: ObjectModels[ownProps.objectTypeInfo.modelId],
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowItems);
