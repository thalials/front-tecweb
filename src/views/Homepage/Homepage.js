import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../Context/AuthContext';

function HomePage(props) {
    const email = useRef('');
    const password = useRef('');
    const { authenticated, handleLogin, handleLogout } = useContext(Context);

    return (
        <div>
            <input
                onChange={(e) => {
                    email.current = e.target.value;
                }}
                type='email'
                placeholder='Email'
                name='email'
            />
            <input
                onChange={(e) => {
                    password.current = e.target.value;
                }}
                type='password'
                placeholder='Password'
                name='password'
            />

            <button
                onClick={() => {
                    // handleLogout()
                    handleLogin(email.current, password.current);
                }}>
                login
            </button>
            <p>
                Não tem uma conta? <Link to='/register'> Cadastre-se aqui</Link>
            </p>
        </div>
    );
}

export default HomePage;
