import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});


export default instance