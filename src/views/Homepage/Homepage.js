import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import"./style.css";
// import { MenuIcon } from '@material-ui/icons';

import { Context } from '../../Context/AuthContext';

function HomePage(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { authenticated, handleLogin } = useContext(Context);
    console.log(authenticated);
    return (
        <div>
             

            <div className="containerLogin">
                <div className="Login">
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        label="Email"
                        variant="outlined"
                    />
                </div>
                <div className="Login">
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        label='Password'
                        variant="outlined"
                    />
                </div>

                <div className="buttom"> 
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => {
                            handleLogin(email, password);
                        }}>
                        {' '}
                    login{' '}
                    </Button>
                </div>

                <Link to='/register'> Não tem uma conta? Cadastre-se aqui </Link>
                <br />

            </div>

        </div>
    );
}

export default HomePage;
