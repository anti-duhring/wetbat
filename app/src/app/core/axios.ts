import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://wetbat-api.onrender.com' : 'http://localhost:3001',
})
