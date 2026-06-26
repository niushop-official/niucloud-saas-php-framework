import axios from 'axios'
import envConfig from '@/utils/config'

axios.defaults.baseURL = envConfig.VITE_APP_BASE_URL

const service = axios.create({
    timeout: 40000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
    }
})
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
    }
)
export default service
