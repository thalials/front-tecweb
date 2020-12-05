import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LoadingIndicator from '../../Components/LoadingIndicator';
import './styles.css';
import Feedback from '../../Components/Feedback';

export default function Register() {
    const name = useRef('');
    const email = useRef('');
    const password = useRef('');
    const description = useRef('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({});
    const { handleRegister, handleLogout, authenticated } = useContext(Context);

    useEffect(() => {
        // IIFE
        if (authenticated) {
            (async () => {
                await handleLogout();
            })();
        }
    }, []);

    return (
        <div className='register-outer-container'>
            <div className='register-inner-container'>
                <TextField
                    onChange={(e) => {
                        name.current = e.target.value;
                    }}
                    type='text'
                    label='Nome'
                    variant='outlined'
                    margin='dense'
                    size='small'
                    color='primary'
                    fullWidth={true}
                    InputProps={{
                        className: 'text-field'
                    }}
                    InputLabelProps={{
                        className: 'text-field-label'
                    }}
                />
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
                    fullWidth={true}
                    InputProps={{
                        className: 'text-field'
                    }}
                    InputLabelProps={{
                        className: 'text-field-label'
                    }}
                />
                <TextField
                    onChange={(e) => {
                        description.current = e.target.value;
                    }}
                    label='Description'
                    variant='outlined'
                    margin='dense'
                    size='small'
                    fullWidth={true}
                    InputProps={{
                        className: 'text-field'
                    }}
                    InputLabelProps={{
                        className: 'text-field-label'
                    }}
                />
                <div className='register-element'>
                    {!loading && !!Object.values(feedback).length ? (
                        <Feedback feedback={feedback} />
                    ) : null}
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth={true}
                        onClick={() => {
                            setLoading(true);
                            handleRegister(
                                name.current,
                                email.current,
                                password.current,
                                description.current
                            )
                                .then((message) => {
                                    setFeedback(message);
                                })
                                .finally(() => {
                                    setLoading(false);
                                });
                        }}>
                        {loading ? (
                            <LoadingIndicator width={30} />
                        ) : (
                            'Cadastrar'
                        )}
                    </Button>
                </div>

                <p className='text'>
                    Já possui uma conta? <Link to='/'>Faça login</Link>
                </p>
            </div>
        </div>
    );
}
