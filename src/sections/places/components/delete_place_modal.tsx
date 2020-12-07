import React from 'react';

import { TextField } from '@material-ui/core';
import { IPlace } from '../../../constants/objectInterfaces';

import ConfirmationDialog from '../../../components/dialogs/confirmation_dialog';

interface IProps {
    place: IPlace | null;
    onClose: () => void;
    onConfirm: () => void;
}

const DeletePlaceModal = ({
    onClose,
    onConfirm,
    place
}: IProps) => {
    const renderContent = () => {
        return (
            <>
                <TextField
                    disabled
                    fullWidth
                    className="bottom-padding-l"
                    id="description"
                    label="Categoria"
                    type="text"
                    value={place?.category_description}
                />
                <TextField
                    disabled
                    fullWidth
                    id="description"
                    label="Nome"
                    type="text"
                    value={place?.description}
                />
            </>
        );
    };

    return (
        <ConfirmationDialog
            open={place !== null}
            onClose={onClose}
            onConfirm={onConfirm}
            title='Remover Lugar'
            content={renderContent()}
        />
    );
};

export default DeletePlaceModal;
