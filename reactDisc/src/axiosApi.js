import axios from 'axios';
import { config } from './constants/index';

const instance = axios.create({
    baseURL: config.url.API_URL
});

export default instance;