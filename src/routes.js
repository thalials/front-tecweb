import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './views/Login';
import Register from './views/Register';
import Homepage from './views/Homepage';
import LoadingPage from './views/LoadingPage';

import { Context } from './Context/AuthContext';
import SearchResult from './views/SearchResult/SearchResult';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated, loading, handleLogout } = useContext(Context);
    console.log(authenticated);

    if (loading) {
        return <LoadingPage />;
    }
    if (isPrivate && !authenticated) {
        return <Redirect to='/login' />;
    }

    return <Route {...rest} />;
}

export default function Routes() {
    return (
        <Switch>
            <CustomRoute exact path='/login' component={Login} />
            <CustomRoute exact path='/register' component={Register} />
            <CustomRoute exact path='/' component={Homepage} isPrivate />
            <CustomRoute
                exact
                path='/:city_id'
                component={SearchResult}
                isPrivate
            />
        </Switch>
    );
}
