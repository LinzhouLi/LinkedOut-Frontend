module.exports={
    devServer:{
        proxy:{
            '/user/':{
                // target:'https://www.baidu.com',
                target:'http://47.102.217.130:8001',
                changeOrigin: true,
                secure:false,
                ws:true,
                // pathRewrite:{'^/user':'/user'}
            },
            '/tweet':{
                // target:'https://www.baidu.com',
                target:'http://47.102.217.130:8003',
                changeOrigin: true,
                secure:false,
                ws:true,
                pathRewrite:{'^/tweet':'/tweet'}
            },
            '/recruit':{
                // target:'https://www.baidu.com',
                target:'http://47.102.217.130:8005',
                changeOrigin: true,
                secure:false,
                ws:true,
                pathRewrite:{'^/recruit':'/recruit'}
            },
        }
    }
}