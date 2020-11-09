import axios from "axios";

const current_URL = window.location.href;

export default axios.create({
//   baseURL: current_URL.startsWith("http://localhost") ? "http://localhost:3333" : "https://tecweb-p2.herokuapp.com/" // baseurl do backend
    baseURL: process.env.REACT_APP_APP_API_URL
});
