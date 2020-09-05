import React from 'react';
import { Link } from 'react-router-dom';
// import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CategoryIcon from '@material-ui/icons/Category';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import FolderIcon from '@material-ui/icons/Folder';
import KitchenIcon from '@material-ui/icons/Kitchen';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import PlaceIcon from '@material-ui/icons/Place';
import SaveIcon from '@material-ui/icons/Save';

import { routes } from '../../constants/routes';

const TopbarMenu = (props) => {
    const [state, setState] = React.useState({ open: false });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, open });
    };

    const menuPurchaseOptions = [
        {
            title: 'Nova Compra',
            link: routes.NEW_PURCHASE,
            icon: 'AddShoppingCartIcon',
        },
        {
            title: 'Lista de Compras',
            link: routes.SHOPPING_LIST,
            icon: 'FormatListBulletedIcon',
        },
        {
            title: 'Compras Anteriores',
            link: routes.HISTORY,
            icon: 'FolderIcon',
        },
    ];
    const menuOptions = [
        {
            title: 'Lugares',
            link: routes.PLACES,
            icon: 'PlaceIcon',
        },
        {
            title: 'Categorias (Lugares)',
            link: routes.PLACES_CATEGORIES,
            icon: 'NotListedLocationIcon',
        },
        {
            title: 'Produtos',
            link: routes.PRODUCTS,
            icon: 'KitchenIcon',
        },
        {
            title: 'Categorias (Produtos)',
            link: routes.PRODUCTS_CATEGORIES,
            icon: 'EmojiSymbolsIcon',
        },
        {
            title: 'Marcas',
            link: routes.BRANDS,
            icon: 'CategoryIcon',
        },
    ];


    function renderIcon(icon) {
        const components = {
            AddIcon,
            AddShoppingCartIcon,
            CategoryIcon,
            EmojiSymbolsIcon,
            FolderIcon,
            KitchenIcon,
            FormatListBulletedIcon,
            NotListedLocationIcon,
            PlaceIcon,
        };

        const IconName = components[icon];
        return <IconName />;
    }

    // const location = useLocation();

    const list = () => (
        <div
            className="menu"
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuPurchaseOptions.map((option) => (
                    <Link to={option.link} key={option.title}>
                        <ListItem button>
                            <ListItemIcon>
                                {renderIcon(option.icon)}
                            </ListItemIcon>
                            <ListItemText primary={option.title} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {menuOptions.map((option) => (
                    <Link to={option.link} key={option.title}>
                        <ListItem button>
                            <ListItemIcon>
                                {renderIcon(option.icon)}
                            </ListItemIcon>
                            <ListItemText primary={option.title} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    const {
        isEditMode,
        onAdd,
        onEdit,
        onSave,
    } = props;

    return (
        <div className="top-menu">
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon fontSize="large" />
            </Button>
            <div className="top-buttons">
                <Button
                    disableElevation
                    disabled={isEditMode}
                    size="large"
                    classes={{ root: '' }}
                    startIcon={<AddIcon />}
                    variant="outlined"
                    onClick={() => onAdd()}
                >
                    Novo
                </Button>
                <Button
                    disableElevation
                    size="large"
                    classes={{ root: '' }}
                    startIcon={isEditMode ? <CloseIcon /> : <EditIcon />}
                    variant="outlined"
                    onClick={() => onEdit(!isEditMode)}
                >
                    Editar
                </Button>
                <Button
                    disableElevation
                    disabled={!isEditMode}
                    size="large"
                    classes={{ root: '' }}
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    onClick={() => onSave()}
                >
                    Salvar
                </Button>
            </div>
            <SwipeableDrawer
                open={state.open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
};

TopbarMenu.propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};


export default TopbarMenu;
