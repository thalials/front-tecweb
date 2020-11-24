import { useEffect, useState } from 'react';

import api from '../../API/api';
import history from '../../history';
import {
    createErrorMessage,
    createSuccessMessage,
    saveTokenAndName
} from '../../Helpers';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    async function handleLogin(email, password) {
        if (!email) {
            // se o email não estiver preenchido
            return createErrorMessage('O email deve ser preenchido');
        }
        if (!password) {
            // se nao tiver preenchido
            return createErrorMessage('A senha deve ser preenchida');
        }
        return await api.post('/auth/authenticate', {
            email,
            password
        })
            .then((response) => {
                const { token, user } = response.data;
                saveTokenAndName(token, user.name);
            })
            .catch((error) => {
            })
            .finally(() => {
                setAuthenticated(true); // antes e history.push
                history.push('/');
            });
    }
    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');
    }
    async function handleRegister(name, email, password, description) {
        // teste com name
        if (!name) {
            return createErrorMessage('O nome deve ser preenchido');
        }
        // nome precisa estar padronizado
        if (!name.match(/[A-Z]\w+\s[A-Z]\w+/)) {
            return createErrorMessage(
                'O nome deve possuir pelos menos duas palavras iniciadas com letras maiúsculas'
            );
        }
        // testes com email
        if (!email) {
            // se o email não estiver preenchido
            return createErrorMessage('O email deve ser preenchido');
        } else if (!/.*@.*\..*\D$/i.test(email)) {
            // se o email tiver um formato inválido tipo t@gmai1
            return createErrorMessage('Email inválido');
        }

        // teste com o password
        if (!password) {
            // se nao tiver preenchido
            return createErrorMessage('A senha deve ser preenchida');
        }
        return await api
            .post('/auth/register', {
                name,
                email,
                password,
                description
            })
            .then((response) => {
                const { token, user } = response.data;
                saveTokenAndName(token, user.name, user.description); //Function mudada para salvar os 3
                console.log("Salvos")
                setTimeout(() => {
                    setAuthenticated(true);
                    history.push('/');
                }, 3000);
                return createSuccessMessage(
                    'Você será redirecionado(a) em 3 segundos'
                );
            })
            .catch((error) => {
                return createErrorMessage(
                    'Não foi possível criar a conta. Provavelmente ela já está sendo usada :('
                );
            });
    }
    return {
        authenticated,
        loading,
        handleLogin,
        handleLogout,
        handleRegister
    };
}
