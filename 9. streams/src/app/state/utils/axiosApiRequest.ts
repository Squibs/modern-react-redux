import axios from 'axios';

const axiosApiRequest = axios.create({ baseURL: 'http://localhost:3001' });

export default axiosApiRequest;

/* ----------------------------- lessons learned ---------------------------- */

// const axiosApiRequest = (): AxiosInstance => {
//   return axios.create({ baseURL: 'http://localhost:3001' });
// };
// export default axiosApiRequest;

// the above is not the same as below.

// export default axios.create({
//   baseURL: 'http://localhost:3001',
// });

// which would actually work I would just have to use it like:
// axiosApiRequest().post();

// whereas on the second example I would just have to use it like:
// axiosApiRequest.post();

// not entirely sure if there would be any difference at all.
