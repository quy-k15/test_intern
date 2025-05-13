import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getAlbums = () => axios.get(`${BASE_URL}/albums`);
export const getAlbumById = (id) => axios.get(`${BASE_URL}/albums/${id}`);
export const getPhotosByAlbum = (albumId) =>
  axios.get(`${BASE_URL}/photos?albumId=${albumId}`);
export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const getUserById = (id) => axios.get(`${BASE_URL}/users/${id}`);
