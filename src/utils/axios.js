import axios from 'axios';
import { SERVER_URL } from '../constants';

export default axios.create({
  baseURL: `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
  }://${SERVER_URL}/api`,
  headers: {
    Authorization: `bearer ${localStorage.getItem('token')}`,
  },
});
