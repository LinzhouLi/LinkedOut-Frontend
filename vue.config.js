// import { UserServiceURL, TweetServiceURL, RecruitmentServiceURL } from './src/config.js';

module.exports={
    devServer:{
        proxy:{
            '/api':{
                target: 'http://101.43.31.168:9527/',
                changeOrigin: true,
                withCredentials: true,
                secure: false,
                ws: true,
                pathRewrite: {'^/api': ''}
            },
        }
    }
}