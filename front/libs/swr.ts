import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export const fetcher = (url) => axios.get(url, { withCredentials: true })
  .then((result) => result.data)
