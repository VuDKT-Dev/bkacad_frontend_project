import axios from 'axios'

const token = localStorage.getItem('accessToken')
export const axiosBase = axios.create({
  baseURL: 'https://training.bks.center/',
  headers: {
    Authorization: 'Bearer ' + token,
  },
})
