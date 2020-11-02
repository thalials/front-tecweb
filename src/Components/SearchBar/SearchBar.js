import React, { useState, useEffect, useCallback } from 'react';

import './styles.css';
import SearchResults from './Components/SearchResults';
const data = require('../../Data/cities.json');

function SearchBar(props) {
    // const { data } = props;
    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    // const data = dummyData;

    function search(searchText) {
        const regex = new RegExp(`.*${searchText.toLowerCase()}.*`, 'i');
        console.log(searchText);
        if (searchText.length > 4) {
            let matches = data.filter((element) => {
                return (
                    element.country.toLowerCase().match(regex) ||
                    element.name.toLowerCase().match(regex)
                );
            });
            const results = matches.map(({ country, name }) => {
                return {
                    country,
                    name
                };
            });
            setSearchResult(results);
            console.log(matches);
        } else {
            setSearchResult([]);
        }
    }

    useDebouncedEffect(search, 500, [searchInput]);

    return (
        <>
            <input
                className='search-input'
                placeholder='Pesquisar lugares'
                type='text'
                value={searchInput}
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
            />
            <button
                className='search-button'
                title='Pesquisar'
                onClick={() => {
                    setSearchInput('');
                    setSearchResult([]);
                }}>
                <i class='fas fa-times fa-1x'></i>
            </button>
            {searchResult && <SearchResults data={searchResult} />}
        </>
    );
}
const dummyData = [
    { country: 'BR', result: 'Brasil' },
    { country: 'BR', result: 'São Paulo' }
];

const useDebouncedEffect = (effect, delay, deps) => {
    const callback = useCallback(() => {
        effect(deps[0]);
    }, deps);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [callback, delay]);
};

export default SearchBar;
