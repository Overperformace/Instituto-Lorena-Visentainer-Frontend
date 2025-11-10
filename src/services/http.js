import axios from 'axios';
import { getApiBaseUrl } from './baseurl';

const http = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 20000,
});

export default http;
