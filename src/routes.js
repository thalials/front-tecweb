import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './views/Homepage';
import Register from './views/Register';
import LoadingComponent from './Components/Loading';
import { Context } from './Context/AuthContext';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated, loading } = useContext(Context);
    console.log(authenticated);

    if (loading) {
        return <LoadingComponent />;
    }
    if (isPrivate && !authenticated) {
        return <Redirect to='/' />;
    }

    return <Route {...rest} />;
}

export default function Routes() {
    return (
        <Switch>
            <CustomRoute exact path='/' component={HomePage} />
            <CustomRoute exact path='/register' component={Register} />
        </Switch>
    );
}
