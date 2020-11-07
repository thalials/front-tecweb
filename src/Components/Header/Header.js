import React, { useContext } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';
import SearchBar from '../../Components/SearchBar';
import './styles.css';

function Header() {
    const { handleLogout } = useContext(Context);

    return (
        <AppBar position='static'>
            <Toolbar variant='dense' className='toolbar'>
                <Link to='/'>
                    <Typography variant='h6'>Logo</Typography>
                </Link>

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
