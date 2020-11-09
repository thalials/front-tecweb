import api from './api';
import axios from 'axios';

export async function toggleLike(cityId) {
    const response = await api.put(`/places/likes/${cityId}`);
    const { token, placeIsLiked } = response.data;
    await saveToken(token);
    return placeIsLiked;
}

export async function getCityInfo(cityId) {
    const { data } = await api.get(`/places/cities/${cityId}`);
    const { city, token } = await data;
    await saveToken(token);
    const currency = await getCurrencyInfo(city.country.currency);
    city.country.currency = currency;

    return city;
}

export async function listUserPlaces() {
    const { data } = await api.get('/places/likes');
    const { places, token } = await data;
    await saveToken(token); 
    places.forEach(async (place, index) => {
        const currencyArray = place.city.country.currency;
        places[index].city.country.currency = await getCurrencyInfo(
            currencyArray
        );
    });

    return places;
}

export async function getCurrencyInfo(currencyArray) {
    return await axios
        .get(
            `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencyArray.join(
                ','
            )}`
        )
        .then(({ data }) => {
            // console.log(data);
            const currencies = Object.entries(data.rates);
            return currencies.map(([cur, value]) => {
                return {
                    unit: cur,
                    price: value.toFixed(2)
                };
            });
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
}
export async function saveToken(token) {
    await localStorage.setItem('token', token);
}

export function createQRCodeURI(source, size = 150) {
    const searchParams = new URLSearchParams();
    const params = {
        data: source,
        size: `${size}x${size}`,
        charset: 'UTF-8'
    };
    Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value);
    });
    return `https://api.qrserver.com/v1/create-qr-code/?${searchParams.toString()}`;
}
