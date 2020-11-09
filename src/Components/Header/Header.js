import React, { useContext } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';
import SearchBar from '../../Components/SearchBar';
import './styles.css';
import history from '../../history';
import Logo from './logo'

function Header() {
    const { handleLogout } = useContext(Context);
    const userName = localStorage.getItem('username');
    return (
        <AppBar position='static'>
            <Toolbar variant='dense' className='toolbar'>
                <Link to='/' className='logo'>
                    <Logo size={40} />
                    My travels
                </Link>

                <div className='toolbar-middle'>
                    <SearchBar />
                </div>
                <div className='right-items'>
                    <span className='username'>{nameParser(userName)}</span>
                    <button
                        className='my-places'
                        title='Meus lugares'
                        onClick={() => {
                            history.push('/');
                        }}>
                        <i className='fas fa-map-marked-alt'></i>
                    </button>
                    <button
                        className='logout-button'
                        title='logout'
                        onClick={() => {
                            handleLogout();
                        }}>
                        <i className='fas fa-sign-out-alt'></i>
                    </button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

function nameParser(name) {
    const [firstName, lastName] = name.split(' ');
    if (lastName.length) {
        return `${firstName} ${lastName.substring(0, 1)}.`;
    }
    return firstName;
}

export default Header;
