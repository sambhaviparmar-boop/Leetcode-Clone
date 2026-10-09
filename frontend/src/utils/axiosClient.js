import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,         //browser ko btare ki iske sth cookies add krdena
    headers:{
        'Content-Type': 'application/json'
    }
});

export default axiosClient;