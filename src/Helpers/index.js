import api from '../API/api';

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

export function saveTokenAndName(token, name) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
    localStorage.setItem('username', name);
}
