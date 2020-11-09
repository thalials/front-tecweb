import React, { useState } from 'react';
import Travels from '../../views/Homepage/Travels';
import Converter from '../../views/Homepage/Converter';


import './styles.css';

function HorizontalTabs() {
    const [value, setValue] = useState(0);
    const [index, setIndex] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className='horizontal-tabs'>
                <Tab
                    title='Cidades curtidas'
                    index={1}
                    callback={setIndex}
                    selected={index}
                />
                <Tab
                    title='Conversor de moedas'
                    index={2}
                    callback={setIndex}
                    selected={index}
                />
                {/* <Tab
                    title='Tab 3'
                    index={3}
                    callback={setIndex}
                    selected={index}
                /> */}
            </div>

            <div className='main-content'>
                {index === 1 && <Travels />}
                {index === 2 && <div className="converter-outer-container "> <Converter moedaA="USD" moedaB="BRL" /> <Converter moedaA="BRL" moedaB="USD"/> </div> }
                {/* {index === 3 && <span>esta é a tab 3</span>} */}
            </div>
        </div>
    );
}

function Tab(props) {
    const { title, index, callback, selected } = props;

    return (
        <button
            className='tabs'
            onClick={() => {
                callback(index);
            }}
            style={{
                borderBottom: selected === index ? '3px solid #cc2200' : null
            }}>
            <i className='fas fa-heart tab-text'></i>
            <span className='tab-text'>{title}</span>
        </button>
    );
}

export default HorizontalTabs;
