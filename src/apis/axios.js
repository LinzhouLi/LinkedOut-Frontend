import axios from 'axios';

// axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 用户模块
const UserInstance = axios.create(
)

UserInstance.interceptors.request.use(config=>{
  console.log(config)
    return config
} ,error=>{
    return Promise.reject(error)
})

UserInstance.interceptors.response.use(function (response) {
    // 处理响应数据
    return response
  }, function (error) {
    // 处理响应失败
    return Promise.reject(error)
})

const TweetInstance=axios.create()
  
  TweetInstance.interceptors.request.use(config=>{
    console.log(config)
      return config
  } ,error=>{
      return Promise.reject(error)
  })
  
  TweetInstance.interceptors.response.use(function (response) {
      // 处理响应数据
      return response
    }, function (error) {
      // 处理响应失败
      return Promise.reject(error)
  })

  const RecruitInstance=axios.create()
  
  RecruitInstance.interceptors.request.use(config=>{
    console.log(config)
      return config
  } ,error=>{
      return Promise.reject(error)
  })
  
  RecruitInstance.interceptors.response.use(function (response) {
      // 处理响应数据
      return response
    }, function (error) {
      // 处理响应失败
      return Promise.reject(error)
  })



export { UserInstance,TweetInstance,RecruitInstance};
