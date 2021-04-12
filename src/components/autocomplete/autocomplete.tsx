import React from 'react';

import MaterialAutocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core/';
import { IAutocompleteItem } from './types';

interface IProps {
    disabled?: boolean;
    freeSolo?: boolean;
    selected?: IAutocompleteItem | null;
    options: IAutocompleteItem[];
    onChange: (selectedOption: IAutocompleteItem | string) => void;
    title?: string;
}

const Autocomplete = ({
    disabled = false,
    freeSolo = false,
    options = [],
    selected = null,
    title = 'Selecione uma opção',
    onChange
}: IProps) => {
    const handleChange = (evt: any, value: string) => {
        const selectedObject = options.find((option) => option.description === value);
        onChange(selectedObject || value);
    };

    return (
        <MaterialAutocomplete
            disabled={disabled}
            freeSolo={freeSolo}
            options={options.map((option) => option.description)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={title}
                    margin="normal"
                    variant="outlined"
                />
            )}
            style={{ flex: 1 }}
            value={selected?.description}
            onInputChange={handleChange}
        />
    );
};

export default Autocomplete;
