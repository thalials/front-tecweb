import React from 'react';


import LoadingIndicator from '../../Components/LoadingIndicator';
import './styles.css';

function LoadingPage() {
    return (
        <div className='loading-page-outer'>
            <LoadingIndicator width={50} color={"#000"}/>
        </div>
    );
}

export default LoadingPage;
