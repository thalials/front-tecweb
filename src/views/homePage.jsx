import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

function HomePage() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function login() {
        const existUser = {
            email: email,
            password: password
        };

        axios.post('http://localhost:3000/auth/authenticate', existUser)
            .then(res => {
                console.log(res);
            }

            )
            .catch(erro => console.log(erro))
    }
    return (
        <div>
            <div>
                Email <input onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div>
                Senha <input onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <button onClick={login}> login </button>
            <Link to="/register"> Não tem uma conta? Cadastre-se aqui </Link>
        </div>
    )
}

export default HomePage;