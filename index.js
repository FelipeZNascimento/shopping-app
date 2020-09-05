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
    Menu,
    NewPurchase,
    ShowItems,
} from './sections/index';

import { objectTypes, objectTypeInfo } from './constants/general';

import { Notification } from './components/index';

// REDUCERS
import appReducer from './store/main/reducer';

import * as serviceWorker from './serviceWorker';
import { routes } from './constants/routes';

// Here is where we'll call functions to create our
// initialState (and put a loading componente while it fetchs from DB)
const middlewares = [thunk];
const store = createStore(
    combineReducers({
        appReducer,
    }),
    composeWithDevTools(
        applyMiddleware(...middlewares),
    ),
);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#88aa95',
        },
        secondary: {
            main: '#282c34',
        },
    },
});

// const theme = createMuiTheme();

render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <Notification />
                <Menu />
                <div className="index--container">
                    <Switch>
                        <Route path={routes.NEW_PURCHASE}>
                            <NewPurchase />
                        </Route>
                        <Route path={routes.PLACES}>
                            <ShowItems
                                objectType={objectTypes.places}
                                objectTypeInfo={objectTypeInfo[objectTypes.places]}
                            />
                        </Route>
                        <Route path={routes.PLACES_CATEGORIES}>
                            <ShowItems
                                objectType={objectTypes.placesCategories}
                                objectTypeInfo={objectTypeInfo[objectTypes.placesCategories]}
                            />
                        </Route>
                        <Route path={routes.BRANDS}>
                            <ShowItems
                                objectType={objectTypes.brands}
                                objectTypeInfo={objectTypeInfo[objectTypes.brands]}
                            />
                        </Route>
                        <Route path={routes.PRODUCTS}>
                            <ShowItems
                                objectType={objectTypes.products}
                                objectTypeInfo={objectTypeInfo[objectTypes.products]}
                            />
                        </Route>
                        <Route path={routes.PRODUCTS_CATEGORIES}>
                            <ShowItems
                                objectType={objectTypes.productsCategories}
                                objectTypeInfo={objectTypeInfo[objectTypes.productsCategories]}
                            />
                        </Route>
                        <Route exact path={routes.HOME}>
                            <NewPurchase />
                        </Route>
                        <Route>
                            <NewPurchase />
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
serviceWorker.register();
