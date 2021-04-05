/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
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
} from 'react-router-dom';

import './App.scss';

import {
    BrandsSection,
    Menu,
    HomeSection,
    PlacesList,
    PlacesCategoriesList,
    Product,
    ProductsList,
    ProductsCategories,
    SidebarList,
    ShoppingList,
    PurchaseList,
    PurchaseHistory
} from './sections/index';

import { Notification } from './components/index';

// REDUCERS
import appReducer from './store/main/reducer';
import brandReducer from './store/brand/reducer';
import shoppingListReducer from './store/shopping_list/reducer';
import placeReducer from './store/place/reducer';
import productReducer from './store/product/reducer';
import purchaseReducer from './store/purchase/reducer';

import registerServiceWorker from './serviceWorker';

import { routes } from './constants/routes';

// Here is where we'll call functions to create our
// initialState (and put a loading componente while it fetchs from DB)
const middlewares = [thunk];
const store = createStore(
    combineReducers({
        appReducer,
        brandReducer,
        shoppingListReducer,
        placeReducer,
        productReducer,
        purchaseReducer
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
            disabled: '#666666'
        }
    },
    overrides: {
        MuiAvatar: {
            root: {
                fontSize: '12px'
            },
            colorDefault: {
                backgroundColor: '#7a8288',
                color: '#FFFFFF'
            }
        },
        MuiCard: {
            root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#59b8c4'
            },
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                color: "white"
            },
        },
        MuiPickersDay: {
            day: {
                color: '#59b8c4',
            },
            dayDisabled: {
                color: '#353b41'
            },
            daySelected: {
                backgroundColor: '#59b8c4'
            },
            current: {
                color: '#fff'
            }
        },
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
                borderLeft: '1px solid black'
            }
        },
        MuiDialog: {
            paper: {
                backgroundColor: '#1f2225',
                color: '#fff'
            }
        },
        MuiDialogTitle: {
            root: {
                color: '#ffffff'
            }
        },
        MuiTypography: {
            colorTextSecondary: {
                color: '#97a1a8'
            }
        }
    }
});

// const theme = createMuiTheme();
const containerClass = classNames({
    'index-container--mobile': isMobile,
    'index-container--regular': !isMobile,
});

render(
    <Provider store={store}>
        <Router>
            <ThemeProvider theme={theme}>
                <Menu />
                <SidebarList />
                <Notification />
                <div className={containerClass}>
                    <Switch>
                        <Route exact path={routes.HOME}>
                            <HomeSection />
                        </Route>
                        <Route path={routes.PURCHASES_SECTION}>
                            <Route path={routes.PURCHASE_FORM} component={PurchaseList} />
                            <Route path={routes.SHOPPING_LIST} component={ShoppingList} />
                            <Route path={routes.PURCHASE_HISTORY} component={PurchaseHistory} />
                        </Route>
                        <Route path={routes.PURCHASE + "/:purchaseId"} component={PurchaseHistory} />
                        <Route path={routes.PLACES_SECTION}>
                            <Route path={routes.PLACES_CATEGORIES} component={PlacesCategoriesList} />
                            <Route path={routes.PLACES_LIST} component={PlacesList} />
                        </Route>
                        <Route path={routes.PRODUCTS_SECTION}>
                            <Route path={routes.PRODUCTS_CATEGORIES} component={ProductsCategories} />
                            <Route path={routes.PRODUCTS_LIST} component={ProductsList} />
                        </Route>
                        <Route path={routes.PRODUCT + "/:productId"} component={Product} />
                        <Route path={routes.BRANDS} component={BrandsSection} />
                        <Route>
                            <HomeSection />
                        </Route>
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
