import api from '../API/api';
const data = require('../Data/short_cities.json');

export function createErrorMessage(msg) {
    return {
        message: msg,
        bgColor: '#ff200099',
        color: '#f6f6f6'
    };
}
export function createSuccessMessage(msg) {
    return {
        message: msg,
        bgColor: '#20ff0099',
        color: '#f6f6f6'
    };
}

export function saveTokenAndName(token, name, description) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
    localStorage.setItem('username', name);
    localStorage.setItem('description', description);
}

/**
 *
 * @param {string} cityName
 */
export function getCityId(cityName) {
    const [{ _id }] = data.filter((city) => city.name === cityName);

    if (!!_id.length) {
        return '/' + _id;
    }
    return '/';
}
