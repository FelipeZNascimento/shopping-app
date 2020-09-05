import { connect } from 'react-redux';

import Menu from './menu';
// import fetchItems from '../../services/dataGetters';
// import { setItem, setPurchase } from '../../services/dataSetters';

// import { objectTypes } from '../../constants/general';
import {
    toggleAddMode,
    toggleEditMode,
    toggleSaveMode,
} from '../../store/main/actions';

import {
    isEditMode,
} from '../../store/main/selector';

const mapDispatchToProps = (dispatch) => ({
    onEdit: (status) => dispatch(toggleEditMode(status)),
    onAdd: () => dispatch(toggleAddMode()),
    onSave: () => dispatch(toggleSaveMode()),
});

function mapStateToProps(state) {
    return {
        isEditMode: isEditMode(state),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Menu);
