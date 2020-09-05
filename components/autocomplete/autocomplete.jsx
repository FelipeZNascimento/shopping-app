import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MaterialAutocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

// const filter = createFilterOptions();

export class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedObject: null,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // filterAddNewOption = function (options, params) {
    //     const filtered = filter(options, params);

    //     if (params.inputValue !== '') {
    //         filtered.push({
    //             newlyAdded: true,
    //             description: params.inputValue,
    //         });
    //     }

    //     return filtered;
    // };

    sortAlphabetically = function (options) {
        if (!options) {
            return [];
        }

        return options.map((option) => {
            const firstLetter = option.description[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...option,
            };
        });
    };

    handleChange = function (evt, object) {
        const { onChange } = this.props;

        onChange(evt, object);

        this.setState({
            selectedObject: object,
        });
    };

    renderOptionIcon = function (option) {
        if (!option) {
            return;
        }

        if (!option.icon) {
            option.icon = faQuestionCircle;
        }
        return (
            <div className="autocomplete--icon">
                <FontAwesomeIcon icon={option.icon} color="grey" />
            </div>
        );
    }

    render() {
        const {
            disabled,
            iconsEnabled,
            id,
            options,
            selected,
            title,
        } = this.props;

        const autocompleteOptions = this.sortAlphabetically(options);

        return (
            <MaterialAutocomplete
                disabled={disabled}
                id={id}
                // filterOptions={(optionsAux, params) => this.filterAddNewOption(optionsAux, params)}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => (option.description ? option.description : option)}
                options={autocompleteOptions.sort((a, b) => -b.description.localeCompare(a.description))}
                renderInput={(params) => (
                    <>
                        <TextField
                            {...params}
                            label={title}
                            variant="outlined"
                        />
                    </>
                )}
                renderOption={(option) => (
                    <>
                        {iconsEnabled && this.renderOptionIcon(option)}
                        {option.description}
                    </>
                )}
                style={{ margin: '0 auto' }}
                onChange={(e, option) => this.handleChange(e, option)}
                value={selected ? selected.category_id : null}
                inputValue={selected ? selected.category_description : null}
            />
        );
    }
}

Autocomplete.propTypes = {
    disabled: PropTypes.bool,
    iconsEnabled: PropTypes.bool,
    id: PropTypes.string,
    selected: PropTypes.arrayOf(PropTypes.shape({
        category_description: PropTypes.string,
        category_id: PropTypes.number,
    })),
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    })),
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string,
};

Autocomplete.defaultProps = {
    disabled: false,
    iconsEnabled: false,
    id: 'autocomplete-input',
    options: [],
    selected: [],
    title: 'Selecione uma opção',
};


export default Autocomplete;
