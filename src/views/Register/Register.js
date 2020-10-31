import React, { useState, useContext } from 'react';
// import { AppBar, Toolbar, IconButton, MenuIcon } from '@material-ui/core';
import { Context } from '../../Context/AuthContext';
import { AppBar, Toolbar, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

export default function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { handleRegister } = useContext(Context);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        Logo
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <div>
                Nome{' '}
                <TextField onChange={(e) => setName(e.target.value)} type='text' />
            </div>
            <div>
                Email{' '}
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                />
            </div>
            <div>
                Senha{' '}
                <TextField
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
