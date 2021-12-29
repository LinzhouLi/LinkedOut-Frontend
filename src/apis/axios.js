import axios from 'axios';
import { userBaseUrl, tweetBaseUrl, recruitmentBaseUrl } from '@/config.js';

// 用户模块
const UserInstance = axios.create(
)

UserInstance.interceptors.request.use(config => {
    config.baseURL = userBaseUrl;
    return config;
} ,error => {
    return Promise.reject(error);
})

UserInstance.interceptors.response.use(response => {
    // 处理响应数据
    return response;
  }, error => {
    // 处理响应失败
    return Promise.reject(error);
})

const TweetInstance = axios.create()
  
TweetInstance.interceptors.request.use(config => {
    config.baseURL = tweetBaseUrl;
    return config;
} ,error => {
    return Promise.reject(error);
})

TweetInstance.interceptors.response.use(response => {
    // 处理响应数据
    return response;
  }, error => {
    // 处理响应失败
    return Promise.reject(error);
})

const RecruitInstance = axios.create()

RecruitInstance.interceptors.request.use(config => {
    config.baseURL = recruitmentBaseUrl;
    return config;
} ,error => {
    return Promise.reject(error);
})

RecruitInstance.interceptors.response.use(response => {
    // 处理响应数据
    return response;
  }, error => {
    // 处理响应失败
    return Promise.reject(error);
})

export { UserInstance, TweetInstance, RecruitInstance };
