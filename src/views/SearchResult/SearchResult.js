import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import LoadingIndicator from '../../Components/LoadingIndicator/LoadingIndicator';
import api from '../../api';

import './styles.css';
function SearchResult(props) {
    const _id = props.match.params.city_id;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            await api
                .get(`/places/${_id}`)
                .then(async (res) => {
                    let currency = res.data.city.country.currency;
                    let currencyList = currency.join(',');
                    // extrair
                    await axios
                        .get(
                            `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencyList}`
                        )
                        .then(({ data }) => {
                            currency = currency.map((cur) => {
                                return {
                                    unit: cur,
                                    price: data.rates[cur].toFixed(2)
                                };
                            });
                            res.data.city.country.currency = currency;
                        });
                    setData(res.data);
                })
                .then(() => setLoading(false))
                .catch((err) => console.log(err));
        })();
    }, [_id]);

    return (
        <div>
            <Header />
            <section className="test" style={{ height:'90vh', justifyContext:'center', display:'flex'}}>
            <div className='search-result-outer'>
                <div className='search-result-card'>
                    {loading ? (
                        <LoadingIndicator width={30} />
                    ) : Object.entries(data).length ? (
                        <ResultCard data={data} />
                    ) : (
                        <EmptyFeedback />
                    )}
                </div>
            </div>
            </section>
            
        </div>
    );
}

function ResultCard(props) {
    const { city } = props.data;
    const { country, lat, lng, _id } = city;
    return (
        <div className='result-card-outer'>
            <div className='city-map'>
                <iframe
                    src={`https://maps.google.com/maps?q=${lat}, ${lng}&z=12&output=embed`}
                    width='100%'
                    height='300px'
                    frameborder='0'></iframe>
            </div>
            <span className='country-continent'>
                Continent: {country.continent.name}
            </span>
            <span className='country-name'>
                Country: {country.name} ({country.native})
            </span>
            <span className='country-capital'>Capital: {country.capital}</span>
            <span className='country-phone'>Phone: +{country.phone}</span>
            <span className='country-currency'>
                Currency:
                <ul className='currency-list'>
                    {country.currency.map((cur) => (
                        <li className='currency-item'>
                            {cur.unit} - {cur.price}
                        </li>
                    ))}
                </ul>
            </span>
            <span className='country-languages'>
                Language(s):
                <ul className='language-list'>
                    {country.languages.map((item) => (
                        <li className='language-item'>{item.name}</li>
                    ))}
                </ul>
            </span>
            <span className='city-name'>Cidade: {city.name}</span>
            <div className='likes'>
                <button className='likes'>
                    <i className='far fa-heart likes'></i>
                    <i className='fas fa-heart likes'></i>
                </button>
                Liked by: {city.likes || 0}
            </div>
        </div>
    );
}

function EmptyFeedback() {
    return <div>Nãofoi possível recuperar informações sobre esse lugar</div>;
}

const dummyData = {
    city: {
        _id: '5fa0b349b20d4824443f6f2e',
        name: 'São Paulo',
        lat: '-23.5475',
        lng: '-46.63611',
        country: {
            currency: ['BRL'],
            languages: [
                {
                    name: 'Portuguese',
                    native: 'Português',
                    initials: 'pt'
                }
            ],
            name: 'Brazil',
            native: 'Brasil',
            phone: '55',
            capital: 'Brasília',
            initials: 'BR',
            continent: {
                name: 'South America',
                initials: 'SA'
            }
        }
    }
};

export default SearchResult;
