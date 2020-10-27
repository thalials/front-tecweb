import React, { createContext, useState } from 'react';

import api from '../api';

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);

    async function handleLogin(email, password) {
        const { data } = await api.post('/auth/authenticate', {
            email,
            password
        });
        if (data.token) {
            localStorage.setItem('token', JSON.stringify(data.token));
        }
        setAuthenticated(true);
    }
    async function handleRegister(name, email, password) {
        const { data } = await api.post('/auth/register', {
            name,
            email,
            password
        });
        console.log(data);
    }

    return (
        <Context.Provider
            value={{ authenticated, handleLogin, handleRegister }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
