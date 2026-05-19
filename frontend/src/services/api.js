import axios from 'axios';

const AUTH_URL = 'http://localhost:5277';
const USER_URL = 'http://localhost:5231';
const POST_URL = 'http://localhost:5021';

// Get JWT token from localStorage
const getToken = () => localStorage.getItem('token');

// Auth headers
const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

// ── AUTH SERVICE ──
export const register = (data) =>
  axios.post(`${AUTH_URL}/auth/register`, data);

export const login = (data) =>
  axios.post(`${AUTH_URL}/auth/login`, data);

// ── USER SERVICE ──
export const createProfile = (data) =>
  axios.post(`${USER_URL}/users`, data, authHeaders());

export const getProfile = (authUserId) =>
  axios.get(`${USER_URL}/users/${authUserId}`, authHeaders());

export const updateProfile = (authUserId, data) =>
  axios.put(`${USER_URL}/users/${authUserId}`, data, authHeaders());

export const getAllProfiles = () =>
  axios.get(`${USER_URL}/users`, authHeaders());

export const getMatches = (authUserId) =>
  axios.get(`${USER_URL}/users/match/${authUserId}`, authHeaders());

// ── POST SERVICE ──
export const createPost = (data) =>
  axios.post(`${POST_URL}/posts`, data, authHeaders());

export const getAllPosts = () =>
  axios.get(`${POST_URL}/posts`);

export const searchPosts = (offering, wanting) =>
  axios.get(`${POST_URL}/posts/search`, {
    params: { offering, wanting }
  });

export const deletePost = (id) =>
  axios.delete(`${POST_URL}/posts/${id}`, authHeaders());