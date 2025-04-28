import axios from 'axios'
import {formatTimeDfs} from 'seasun-util';

export const instance = axios.create({
    timeout: 60 * 1000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
})

instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        console.error(error)
        Promise.reject(error)
    }
)

export async function request(options: any) {
    const {
        debug = false,
        loading = false,
        successNotice = false,
        errorNotice = false,
        formatResponseTime = false,
        getResponse = false,
        ...config
    } = options


    try {
        const response = await instance(config)

        if (response.status === 200) {
            const result = response.data

            if (formatResponseTime) {
                formatTimeDfs(result)
            }

            return getResponse ? response : result
        }
        return Promise.reject(response)
    } catch (error: any) {
        console.log('Request error:', error?.message)
        throw error
    } finally {

    }
}
