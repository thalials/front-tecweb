import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './views/Homepage';
import Register from './views/Register';

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/register' component={Register} />
        </Switch>
    );
}
