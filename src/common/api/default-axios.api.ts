import defaultAxios from 'axios'

export const axios = defaultAxios.create({
    baseURL: 'http://localhost:3000/'
})
axios.interceptors.response.use(function(response) {
    if (response.data && response.data.statusCode && !(response.data.statusCode >= 200 && response.data.statusCode < 300)) throw new Error()
    return response;
}, function(error) {
    return Promise.reject(error);
});
