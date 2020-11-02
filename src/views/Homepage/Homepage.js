import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import Header from '../../Components/Header'
import VerticalTabs from '../../Components/VerticalTabs'

function Homepage() {
    const { handleLogout } = useContext(Context);

    function search(query) {
        const regex = /.*query.*/g;
        
    }

    return (
        <>
            <Header />
            <VerticalTabs />
        </>
    );
}

export default Homepage;
