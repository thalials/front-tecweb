import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Context } from '../../Context/AuthContext';
import SearchBar from '../../Components/SearchBar';
import './styles.css';

function Header() {
    const { handleLogout } = useContext(Context);

    return (
        <AppBar position='static'>
            <Toolbar variant='dense' className='toolbar'>
                <Typography variant='h6'>Logo</Typography>

                <div className='toolbar-middle'>
                    <SearchBar />
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
