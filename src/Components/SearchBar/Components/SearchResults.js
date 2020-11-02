import React from 'react';

// import { Container } from './styles';

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
            <p className='result-left'>{country}</p>
            <p className='result-right'>{name}</p>
        </li>
    );
}
export default SearchResults;
