import React from 'react';
import history from '../../../history';

function SearchResults(props) {
    const { data , callback} = props;

    return (
        <ul className='search-results'>
            {data.map((item, index) => (
                <ResultItem key={index} item={item} callback={callback} />
            ))}
        </ul>
    );
}

function ResultItem(props) {
    const { country_initials, name, _id } = props.item;
    const { callback } = props;
    return (
        <div
            onClick={() => {
                history.push(_id);
                callback([])
            }}
            className='result-item'>
            <div className='result-left'>{country_initials}</div>
            <div className='result-right'>{name}</div>
        </div>
    );
}
export default SearchResults;
