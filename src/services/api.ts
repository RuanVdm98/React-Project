import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
})
//rqi
export const fetchRepo = async () => {
  const {data} = await axios.get(`https://api.github.com/repos/HancoVisagie/hello-world`)
  return data
}

export default api
