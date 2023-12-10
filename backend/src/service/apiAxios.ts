import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.message === 'Network Error') {
            console.log('Network Error:', error);
        }
        return Promise.reject(error);
    }
);

export default instance