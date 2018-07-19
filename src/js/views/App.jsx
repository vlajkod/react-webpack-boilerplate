import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import { routesCodes } from 'constants/routes';

import Menu from 'components/common/Menu';
import Home from 'views/Home';
import ApiCall from 'views/ApiCall';
import NotFound from 'views/NotFound';



class App extends Component {
    render() {
        return (
            <div class='app'>
                <Menu />
                <div class='page'>
                    <Switch>
                        <Route exact path= { routesCodes.HOME } component = { Home } />
                        <Route path= { routesCodes.API } component = { ApiCall } />
                        <Route path='*' component = { NotFound } />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);