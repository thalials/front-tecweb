import React from 'react';

function SearchResults(props) {
    const { data } = props;

    return (
        <ul className='search-results'>
            {data.map((item, index) => (
                <ResultItem key={index} item={item} />
            ))}
        </ul>
    );
}

function ResultItem(props) {
    const { country, name } = props.item;
    return (
        <li className='result-item'>
            <button
                to='/'
                onClick={() => {
                    console.log(country);
                }}
                className='result-left'>
                {country}
            </button>
            <button
                to='/'
                onClick={() => {
                    console.log(name);
                }}
                className='result-right'>
                {name}
            </button>
        </li>
    );
}
export default SearchResults;
