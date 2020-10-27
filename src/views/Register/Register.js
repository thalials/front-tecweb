import React, { useState, useContext } from 'react';

import { Context } from '../../Context/AuthContext';

export default function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { handleRegister } = useContext(Context);

    return (
        <div>
            <div>
                Nome{' '}
                <input onChange={(e) => setName(e.target.value)} type='text' />
            </div>
            <div>
                Email{' '}
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                />
            </div>
            <div>
                Senha{' '}
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />
            </div>
            <button
                onClick={() => {
                    handleRegister(name, email, password);
                }}>
                {' '}
                cadastrar{' '}
            </button>
        </div>
    );
}
