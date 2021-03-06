import { UserInstance as user } from './axios';

export function getEmailCode(params){
    return user.post('/email',{...params},{params:{
        mail:params.mail
    }})
}

export function userRegister(params){
    return user.post('/register',{...params})
}

export function userLogin(params){
    return user.post('/login', params)
}

//获取用户基础信息
export function getBasicInfo(uid){
    return user.get('/get/' + uid)
}

//获取用户个人信息
export function getUserInfo(params){
    return user.get('/userinfo',{params})
}

//获取企业用户个人信息
export function getEnterpriseInfo(params){
    return user.get('/enterpriseinfo',{params})
}

//用户个人信息维护
export function updateUserInfo(params){
    return user.post('/userinfo', params)
}

//企业个人信息维护
export function updateEnterpriseInfo(params){
    return user.post('/enterpriseinfo', params)
}

//上传头像
export function upLoadUserImage(params){
    return user.post('/pic', params);
}

//上传背景图
export function upLoadUserBackground(params){
    return user.post('/back', params);
}

// 查找用户
export function userSearch(params){
    return user.get('/search',{params})
}

//教育经历 增删改查
export function postEduBackground(params){
    return user.post('/edu',params)
}

export function deleteUserEduBackground(params){
    return user.delete('/edu',{params})
}

export function updateUserEduBackground(params){
    return user.put('/edu',params)
}

//查询教育经历
export function getUserEduBackground(params){
    return user.get('/edu',{params})
}


//工作经历 增删改查
export function postUserJobBackground(params){
    return user.post('/job',params)
}

//查询工作经历
export function getUserJobBackground(params){
    return user.get('/job',{params})
}

export function deleteUserJobBackground(params){
    return user.delete('/job',{params})
}

export function updateUserJobBackground(params){
    return user.put('/job',params)
}


//简历文件：增删查
export function getResume(params){
    return user.get('/resume',{params})
} 

export function deleteResume(params){
    return user.delete('/resume',{params})
} 

export function postResume(params){
    return user.post('/resume', params);
} 

