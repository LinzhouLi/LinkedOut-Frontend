import {UserInstance as user} from './axios';
import axios from 'axios';


export function getEmailCode(params){
    return user.post('/user/email',{...params},{params:{
        mail:params.mail
    }})
}

export function userRegister(params){
    return user.post('/user/register',{...params})
}

export function userLogin(params){
    return user.post('/user/login', params)
}

//获取用户基础信息
export function getBasicInfo(uid){
    return user.get('/user/get/' + uid)
}

//获取用户个人信息
export function getUserInfo(params){
    return user.get('/user/userinfo',{params})
}

//获取企业用户信息
export function getEnterpriseInfo(params){
    return user.get('/user/enterpriseinfo',{params})
}

//用户个人信息维护
export function updateUserInfo(params){
    return user.post('/user/userinfo', params)
}

//企业个人信息维护
export function updateEnterpriseInfo(params){
    return user.post('/user/enterpriseinfo', params)
}

//上传头像
export function upLoadUserImage(params){
    return axios({
        method: 'post',
        url: '/user/pic',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: params,
    });
}

// 查找用户
export function userSearch(params){
    return user.get('/user/search',{params})
}

//教育经历 增删改查
export function postEduBackground(params){
    return user.post('/user/edu',params)
}

export function deleteUserEduBackground(params){
    return user.delete('/user/edu',{params})
}

export function updateUserEduBackground(params){
    return user.put('/user/edu',params)
}

//查询教育经历
export function getUserEduBackground(params){
    return user.get('/user/edu',{params})
}


//工作经历 增删改查

export function postUserJobBackground(params){
    return user.post('/user/job',params)
}


//查询工作经历
export function getUserJobBackground(params){
    return user.get('/user/job',{params})
}

export function deleteUserJobBackground(params){
    return user.delete('/user/job',{params})
}

export function updateUserJobBackground(params){
    return user.put('/user/job',params)
}


//简历文件：增删查
export function getResume(params){
    return user.get('/user/resume',{params})
} 

export function deleteResume(params){
    return user.delete('/user/resume',{params})
} 

export function postResume(params){
    return axios({
        method: 'post',
        url: '/user/resume',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: params,
    });
} 

