import React from 'react';

import MaterialAutocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core/';

interface IItem {
    description: string
    firstLetter?: string,
    id: number | undefined
}

interface IProps {
    disabled?: boolean;
    id?: string;
    selected?: IItem | null;
    options: IItem[];
    onChange: (item: IItem) => void;
    title?: string;
}

const Autocomplete = ({
    disabled = false,
    id = 'autocomplete-input',
    options,
    selected = null,
    title = 'Selecione uma opção',
    onChange
}: IProps) => {
    const sortAlphabetically = (options: IItem[]) => {
        return options.map((option) => {
            const firstLetter = option.description[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...option,
            };
        });
    };

    const handleChange = (evt: any, object: any) => {
        onChange(object);
    };

    const hasManyOptions = options.length > 10;
    const autocompleteOptions = hasManyOptions ? sortAlphabetically(options) : options;

    return (
        <MaterialAutocomplete
            disableClearable
            disabled={disabled}
            id="combo-box-demo"
            options={autocompleteOptions}
            getOptionLabel={(option) => option.description}
            renderInput={(params) => <TextField {...params} label={title} variant="outlined" />}
            value={selected || undefined}
            inputValue={selected ? selected.description : undefined}
            onChange={handleChange}
        />
    );
};

export default Autocomplete;
