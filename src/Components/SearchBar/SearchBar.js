import React, { useState, useEffect, useCallback } from 'react';
import useDebouncedEffect from './hooks/useDebounced';
import './styles.css';
import SearchResults from './Components/SearchResults';
const data = require('../../Data/short_cities.json');

function SearchBar(props) {
    // const { data } = props;
    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    function search(searchText) {
        const regex = new RegExp(`.*${searchText.toLowerCase()}.*`, 'i');
        console.log(searchText);
        if (searchText.length > 2) {
            let matches = data.filter((element) => {
                return (
                    element.country.toLowerCase().match(regex) ||
                    element.name.toLowerCase().match(regex)
                );
            });
            const results = matches.map((item) => item);
            setSearchResult(results);
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
            {searchResult && <SearchResults data={searchResult} callback={setSearchResult}/>}
        </>
    );
}

export default SearchBar;
