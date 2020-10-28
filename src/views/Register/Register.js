import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

export default function Register() {
    const name = useRef('');
    const email = useRef('');
    const password = useRef('');
    const { handleRegister } = useContext(Context);

    return (
        <div>
            Nome
            <input
                onChange={(e) => {
                    name.current = e.target.value;
                }}
                type='text'
            />
            Email
            <input
                onChange={(e) => {
                    email.current = e.target.value;
                }}
                type='email'
            />
            Senha
            <input
                onChange={(e) => {
                    password.current = e.target.value;
                }}
                type='password'
            />
            <button
                onClick={() => {
                    handleRegister(
                        name.current,
                        email.current,
                        password.current
                    );
                }}>
                cadastrar
            </button>
            <p>
                Já possui uma conta? <Link to='/'>Faça login</Link>
            </p>
        </div>
    );
}
