import React from 'react';
import { Router } from 'react-router-dom';

import './reset.css';

import { AuthProvider } from './Context/AuthContext';
import Routes from './routes';
import history from './history';

function App() {
    return (
        <div className='app'>
            <AuthProvider>
                <Router history={history}>
                    <Routes />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
