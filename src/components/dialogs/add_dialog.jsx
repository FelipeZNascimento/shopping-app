import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class AddDialog extends Component {
    render() {
        const {
            children,
            onClose,
            onConfirm,
            title,
        } = this.props;

        return (
            <Dialog
                open
                fullWidth
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Adicionar {title}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        Mensagem qualquer
                    </DialogContentText> */}
                    { children }
                </DialogContent>
                <DialogActions>
                    <Button
                        disableElevation
                        classes={{ root: 'flex-grow' }}
                        color="secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        disableElevation
                        classes={{ root: 'flex-grow' }}
                        color="primary"
                        variant="contained"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

// AddDialog.defaultProps = {
//     errorMessage: 'Error',
// };

export default AddDialog;
