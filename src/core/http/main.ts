import axios from 'axios';

const BASE_URL = import.meta.env['VITE_VUE_APP_URL_API'];
const TIMEOUT = import.meta.env['VITE_VUE_APP_TIMEOUT'];

const http = axios.create(
  {
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }
);

export default http;
