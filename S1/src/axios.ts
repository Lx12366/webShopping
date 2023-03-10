import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getCookie } from "~/Hook/cookie";
import { toast } from "~/Hook/util";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API
})


// 添加请求拦截器
instance.interceptors.request.use(function (config: AxiosRequestConfig) {
    // 在发送请求之前做些什么
    const token = getCookie()

    if (token) {
        //区分是否存在token  存在token的时候 请求头携带token来请求数据  后端验证token
        //只有登录页面会赋予token的值
        if (config && config?.headers) {
            config.headers["token"] = token
        }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //数据解构
    return response.request.responseType == 'blob' ? response.data : response.data.data;
}, function (error) {

    // 对响应错误做点什么

    toast('失败', error.response.data.msg || '请求失败', 'error')

    return Promise.reject(error);
});

export default instance