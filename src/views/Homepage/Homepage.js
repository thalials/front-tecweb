import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../Context/AuthContext';

function HomePage(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { authenticated, handleLogin } = useContext(Context);
    console.log(authenticated);
    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Email'
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
            />
            <button
                onClick={() => {
                    handleLogin(email, password);
                }}>
                {' '}
                login{' '}
            </button>
            <Link to='/register'> Não tem uma conta? Cadastre-se aqui </Link>
            <br />
        </div>
    );
}

export default HomePage;
