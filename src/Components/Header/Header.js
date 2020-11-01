import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Context } from '../../Context/AuthContext';

import './styles.css';

function Header() {
    const { handleLogout } = useContext(Context);
    const [searchResult, setSearchResult] = useState(true);

    function search(query) {
        const regex = /.*query.*/g;
    }
    const data = {
        country: 'BR',
        result: 'São Paulo'
    };

    return (
        <AppBar position='static'>
            <Toolbar variant='dense' className='toolbar'>
                <Typography variant='h6'>Logo</Typography>

                <div className='toolbar-middle'>
                    <input
                        className='search-input'
                        placeholder='Pesquisar lugares'
                        type='text'
                        onClick={(e) => {
                            search(e.target.value);
                        }}
                    />
                    <button
                        className='search-button'
                        title='Pesquisar'
                        onClick={() => {}}>
                        <i class='fas fa-search'></i>
                    </button>
                    {searchResult && (
                        <ul className='search-results'>
                            <li className='result-item'>
                                <div className='result-left'>{data.country}</div>
                                <div className='result-right'>{data.result}</div>
                            </li>
                        </ul>
                    )}
                </div>
                <button
                    className='logout-button'
                    title='logout'
                    onClick={() => {
                        handleLogout();
                    }}>
                    <i class='fas fa-sign-out-alt'></i>
                </button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
