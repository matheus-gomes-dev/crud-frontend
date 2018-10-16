import axios from 'axios';
import config from '../config/config';
const { API_URL } = config;

export const getProductsInfo = page => axios.get(`${API_URL}?page=${page}`);
export const deleteProduct = id => axios.delete(`${API_URL}?id=${id}`);
export const newProduct = product => axios.post(`${API_URL}`, product);
export const editProduct = (id, product) =>
  axios.put(`${API_URL}?id=${id}`, product);
