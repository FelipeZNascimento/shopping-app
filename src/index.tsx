/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import thunk from 'redux-thunk';

import {
    applyMiddleware,
    createStore,
    combineReducers,
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from 'react-router-dom';

import './App.scss';

import {
    BrandsSection,
    CategoriesSection,
    Menu,
    PlacesSection,
    ProductsSection,
    SidebarList,
    ShoppingList,
    NewPurchase,
} from './sections/index';


import { Notification } from './components/index';

// REDUCERS
import appReducer from './store/main/reducer';
import shoppingListReducer from './store/shopping_list/reducer';

import registerServiceWorker from './serviceWorker';

import { routes } from './constants/routes';

// Here is where we'll call functions to create our
// initialState (and put a loading componente while it fetchs from DB)
const middlewares = [thunk];
const store = createStore(
    combineReducers({
        appReducer,
        shoppingListReducer
    }),
    composeWithDevTools(
        applyMiddleware(...middlewares),
    ),
);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b8c3cc',
        },
        secondary: {
            main: '#b8c3cc',
        },
        text: {
            disabled: '#AAAAAA'
        }
    },
    overrides: {
        MuiInputBase: {
            root: {
                color: '#ffffff'
            }
        },
        MuiFormLabel: {
            root: {
                color: '#7a8288'
            }
        },
        MuiButton: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.5) !important'
                }
            }
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }
            }
        },
        MuiDrawer: {
            paper: {
                backgroundColor: '#1f2225',
                borderLeft: '1px solid black',
                top: '62px'
            }
        },
        MuiDialog: {
            paper: {
                backgroundColor: '#1f2225'
            }
        },
        MuiDialogTitle: {
            root: {
                color: '#ffffff'
            }
        }
    }

});

// const theme = createMuiTheme();

render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <Menu />
                <SidebarList />
                <Notification />
                <div className="index--container">
                    <Switch>
                        <Route path={routes.SHOPPING_LIST}>
                            <ShoppingList />
                        </Route>
                        {/* <Route path={routes.NEW_PURCHASE}>
                            <NewPurchase />
                        </Route> */}
                        <Route path={routes.PLACES}>
                            <PlacesSection />
                        </Route>
                        <Route path={routes.PRODUCTS}>
                            <ProductsSection />
                        </Route>
                        <Route path={routes.BRANDS}>
                            <BrandsSection />
                        </Route>
                        <Route path={routes.PRODUCTS_CATEGORIES}>
                            <CategoriesSection />
                        </Route>
                        <Route path={routes.PLACES_CATEGORIES}>
                            <CategoriesSection />
                        </Route>
                        <Route exact path={routes.HOME}>
                            <ProductsSection />
                        </Route>
                        <Route>
                            <ProductsSection />
                        </Route>
                    </Switch>
                </div>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
