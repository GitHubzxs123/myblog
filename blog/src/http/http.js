import axios from 'axios';

const instance = {};

instance.install = (Vue)=> {
    axios.interceptors.request.use(config => {
        const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOThlYTEzOGI0NDY0MGU0Y2I4NDg0NiIsImlhdCI6MTYyMTMyNTkyMH0.58Zjnply9nHfaMxmCXjz7oq9eoe7h2uYQC0COAB1bPk';
        config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
        return config;
    }, error=> {
        return Promise.reject(error);
    })

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        return Promise.reject(error);
    })

    Vue.prototype.$http = axios;
}
export default instance;