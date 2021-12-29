// import { UserServiceURL, TweetServiceURL, RecruitmentServiceURL } from './src/config.js';

module.exports={
    devServer:{
        proxy:{
            '/user':{
                target: 'http://175.24.202.178:8001',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {'^/user': '/user'}
            },
            '/tweet':{
                target: 'http://175.24.202.178:8003',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {'^/tweet': '/tweet'}
            },
            '/recruit':{
                target: 'http://175.24.202.178:8005',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite:{'^/recruit': '/recruit'}
            },
        }
    }
}