// import { UserServiceURL, TweetServiceURL, RecruitmentServiceURL } from './src/config.js';

module.exports={
    devServer:{
        proxy:{
            '/api':{
                target: 'http://175.24.202.153:9527/',
                changeOrigin: true,
                withCredentials: true,
                secure: false,
                ws: true,
                pathRewrite: {'^/api': ''}
            },
        }
    }
}