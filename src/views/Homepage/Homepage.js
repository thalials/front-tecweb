import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import Header from '../../Components/Header'
import HorizontalTabs from '../../Components/HorizontalTabs'

function Homepage() {
    const { handleLogout } = useContext(Context);

    function search(query) {
        const regex = /.*query.*/g;
        
    }

    return (
        <>
            <Header />
            <HorizontalTabs />
        </>
    );
}

export default Homepage;
