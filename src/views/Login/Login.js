import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import './style.css';

import { Context } from '../../Context/AuthContext';
import LoadingIndicator from '../../Components/LoadingIndicator';
import history from '../../history';
import Feedback from '../../Components/Feedback';

function HomePage(props) {
    const email = useRef('');
    const password = useRef('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({});
    const { authenticated, handleLogin, handleLogout } = useContext(Context);

    useLayoutEffect(() => {
        // IIFE
        if (authenticated) {
            (async () => {
                await handleLogout();
            })();
        }
    }, []);

    return (
        <div className='homepage-outer-container'>
            <div className='containerLogin'>
                <TextField
                    onChange={(e) => {
                        email.current = e.target.value;
                    }}
                    // type='email'
                    label='Email'
                    variant='outlined'
                    margin='dense'
                    size='small'
                    fullWidth={true}
                    autoComplete={false}
                    InputProps={{
                        className: 'text-field'
                    }}
                    InputLabelProps={{
                        className: 'text-field-label'
                    }}
                />
                <TextField
                    onChange={(e) => {
                        password.current = e.target.value;
                    }}
                    type='password'
                    label='Password'
                    variant='outlined'
                    margin='dense'
                    size='small'
                    autoComplete={false}
                    fullWidth={true}
                    InputProps={{
                        className: 'text-field'
                    }}
                    InputLabelProps={{
                        className: 'text-field-label'
                    }}
                />
                <div className='login-element'>
                    {!loading && !!Object.values(feedback).length ? (
                        <Feedback feedback={feedback} />
                    ) : null}
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth={true}
                        onClick={() => {
                            setLoading(true);
                            handleLogin(email.current, password.current).then(
                                (message) => {
                                    setFeedback(message);
                                    setLoading(false);
                                }
                            );
                        }}>
                        {loading ? <LoadingIndicator width={30} /> : 'Login'}
                    </Button>
                </div>
                <p className='text'>
                    Não tem uma conta?{' '}
                    <Link to='/register'>Cadastre-se aqui</Link>
                </p>
            </div>
        </div>
    );
}

export default HomePage;
