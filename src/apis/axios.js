import axios from 'axios';
import router from '@/router/index.js';
import { ElMessage } from 'element-plus';
import { userBaseUrl, tweetBaseUrl, recruitmentBaseUrl } from '@/config.js';

// 用户模块
const UserInstance = axios.create({ withCredentials: true })

UserInstance.interceptors.request.use(config => {
    config.baseURL = userBaseUrl;
    if (config.data instanceof FormData) { // FormData!!!
        Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }
    return config;
} ,error => {
    return Promise.reject(error);
})

UserInstance.interceptors.response.use(response => {
    // 处理响应数据
    return response;
  }, error => {
    // 处理响应失败
    switch (error.response.status) {
        case 406: { // cookie失效
            ElMessage({
                message: '登录失效, 请重新登录!',
                type: 'warning',
            })
            router.push('/login');
            break;
        }
    }
    return Promise.reject(error);
})

const TweetInstance = axios.create({ withCredentials: true })
  
TweetInstance.interceptors.request.use(config => {
    config.baseURL = tweetBaseUrl;
    if (config.data instanceof FormData) {
        Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }
    return config;
} ,error => {
    return Promise.reject(error);
})

TweetInstance.interceptors.response.use(response => {
    // 处理响应数据
    return response;
  }, error => {
    // 处理响应失败
    switch (error.response.status) {
        case 406: { // cookie失效
            ElMessage({
                message: '登录失效, 请重新登录!',
                type: 'warning',
            })
            router.push('/login');
            break;
        }
    }
    return Promise.reject(error);
})

const RecruitInstance = axios.create({ withCredentials: true })

RecruitInstance.interceptors.request.use(config => {
    config.baseURL = recruitmentBaseUrl;
    if (config.data instanceof FormData) {
        Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }
    return config;
} ,error => {
    return Promise.reject(error);
})

RecruitInstance.interceptors.response.use(response => {
    // 处理响应数据
    return response;
  }, error => {
    // 处理响应失败
    switch (error.response.status) {
        case 406: { // cookie失效
            ElMessage({
                message: '登录失效, 请重新登录!',
                type: 'warning',
            })
            router.push('/login');
            break;
        }
    }
    return Promise.reject(error);
})

export { UserInstance, TweetInstance, RecruitInstance };
