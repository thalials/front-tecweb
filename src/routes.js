import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './views/Login';
import Register from './views/Register';
import Homepage from './views/Homepage';
import LoadingPage from './views/LoadingPage';

import { Context } from './Context/AuthContext';
import { AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function CustomRoute({ isPrivate, appBarOff, ...rest }) {
    const { authenticated, loading, handleLogout } = useContext(Context);
    console.log(authenticated);

    if (loading) {
        return <LoadingPage />;
    }
    if (isPrivate && !authenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <>
            {!appBarOff && (
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6'>Logo</Typography>
                        <button
                            onClick={() => {
                                handleLogout();
                            }}>
                            logout
                        </button>
                    </Toolbar>
                </AppBar>
            )}
            <Route {...rest} />
        </>
    );
}

export default function Routes() {
    return (
        <Switch>
            <CustomRoute exact path='/login' component={Login} appBarOff />
            <CustomRoute
                exact
                path='/register'
                component={Register}
                appBarOff
            />
            <CustomRoute exact path='/' component={Homepage} isPrivate />
        </Switch>
    );
}
