import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import {
    AddShoppingCart,
    Delete as DeleteIcon
} from '@material-ui/icons';

export class Table extends Component {
    renderHeader() {
        const { headerColumns } = this.props;
        return headerColumns.map((header) => (<th key={header}>{header}</th>));
    }

    renderBody() {
        const {
            autocomplete,
            bodyColumns,
            isEditMode,
            onFieldChange,
            onMainAction,
            onSecondaryAction
        } = this.props;

        const iconColor = classNames({
            'of-red': !isEditMode,
            'of-disabled': isEditMode,
        });

        return bodyColumns
            .sort((a, b) => a.description.localeCompare(b.description))
            .map((item) => {
                return (
                    <tr key={item.id}>
                        <IconButton
                            aria-label="add"
                            onClick={() => onMainAction(item)}
                        >
                            <AddShoppingCart />
                        </IconButton>

                        {/* <td>{item.id}</td> */}

                        {/* {item && autocomplete(item)} */}
                        {item.category_id && <td>{item.category_description}</td>}

                        <td>
                            <TextField
                                autoFocus
                                disabled={!isEditMode}
                                fullWidth
                                name="description"
                                type="text"
                                value={item.description}
                                onChange={(e) => onFieldChange(e, item)}
                            />
                        </td>
                        <td>
                            <IconButton
                                disabled={isEditMode}
                                aria-label="delete"
                                onClick={() => onSecondaryAction(item)}
                            >
                                <DeleteIcon classes={{ root: iconColor }} />
                            </IconButton>
                        </td>
                    </tr>
                );
            });
    }

    render() {
        const { color } = this.props;
        const tableColor = classNames({
            'of-green-bg': color === 'green',
        });

        return (
            <table className="table">
                <thead className={tableColor}>
                    <tr>
                        {this.renderHeader()}
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBody()}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    autocomplete: PropTypes.func.isRequired,
    bodyColumns: PropTypes.arrayOf(PropTypes.objectOf),
    color: PropTypes.string,
    headerColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    isEditMode: PropTypes.bool.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onMainAction: PropTypes.func.isRequired,
    onSecondaryAction: PropTypes.func.isRequired,
};

Table.defaultProps = {
    bodyColumns: [],
    color: 'green',
};

export default Table;
