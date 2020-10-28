import React, { createContext, useState, useEffect } from 'react';

import api from '../api';
import LoadingComponent from '../Components/Loading';
import history from '../history';

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.stringify(
                token
            )}`;
            setAuthenticated(true);
        }
        setLoading(false);
    }, []);

    async function handleLogin(email, password) {
        if (!email) {
            // se o email não estiver preenchido
            window.alert('O email deve ser preenchido');
            return;
        }
        if (!password) {
            // se nao tiver preenchido
            window.alert('A senha deve ser preenchida');
            return;
        }
        const { data } = await api.post('/auth/authenticate', {
            email,
            password
        });
        api.defaults.headers.Authorization = `Bearer ${JSON.stringify(
            data.token
        )}`;
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('username', JSON.stringify(data?.user?.name));
        setAuthenticated(true);
        // history.push("/{{{rotaDeUsuariosAutenticados}}}")
    }
    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        api.defaults.headers.Authorization = undefined;
        history.push('/');
    }
    async function handleRegister(name, email, password) {
        // teste com name
        if (!name) {
            window.alert('O nome deve ser preenchido');
            return;
        }
        // testes com email
        if (!email) {
            // se o email não estiver preenchido
            window.alert('O email deve ser preenchido');
            return;
        } else if (!/.*@.*\..*\D$/i.test(email)) {
            // se o email tiver um formato inválido tipo t@gmai1
            window.alert('Email inválido');
            return;
        }

        // teste com o password
        if (!password) {
            // se nao tiver preenchido
            window.alert('A senha deve ser preenchida');
            return;
        }
        const { data } = await api.post('/auth/register', {
            name,
            email,
            password
        });
        console.log(data);
    }

    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <Context.Provider
            value={{
                authenticated,
                handleLogin,
                handleLogout,
                handleRegister
            }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
