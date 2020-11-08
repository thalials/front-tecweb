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

    return city;
}

export async function listUserPlaces() {
    const { data } = await api.get('/places/likes');
    const { places, token } = await data;
    await saveToken(token);
    return places;
}

export async function getCurrencyInfo(currencyArray) {
    const currencyInfo = await axios
        .get(
            `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencyArray}`
        )
        .then(({ data }) => {
            return data.map((cur) => {
                return {
                    unit: cur,
                    price: data.rates[cur].toFixed(2)
                };
            });
        })
        .catch(() => {});
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
