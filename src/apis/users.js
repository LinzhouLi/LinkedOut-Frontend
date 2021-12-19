import {UserInstance as user} from './axios'




export function getEmailCode(params){
    return user.post('/user/email',{...params},{params:{
        mail:params.mail
    }})
}

export function userRegister(params){
    return user.post('/user',{...params})
}

export function userLogin(params){
    return user.get('/user',{params})//
}

export function getUserInfo(params){
    return user.get('/userinfo',{params})
}

//获取企业用户信息
export function getEnterpriseInfo(params){
    return user.get('/enterpriseinfo',{params})
}

//用户信息维护
export function putUserInfo(params){
    return user.put('/userinfo',params)
}

export function putEnterpriseInfo(params){
    return user.put('/enterpriseinfo',params)
}

export function upLoadUserImage(params){
    return user.post('/userinfo/pic',params)
}

export function userSearch(params){
    return user.get('/search/truename',{params})
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

export function getUserEduBackground(params){
    return user.get('/user/edu',{params})
}


//工作经历 增删改查

export function postUserJobBackground(params){
    return user.post('/user/edu',params)
}

export function getUserJobBackground(params){
    return user.get('/user/edu',{params})
}

export function deleteUserJobBackground(params){
    return user.delete('/user/edu',{params})
}

export function updateUserJobBackground(params){
    return user.put('/user/edu',params)
}


//简历文件：增删查
export function getResume(params){
    return user.get('/user/resume',{params})
} 

export function deleteResume(params){
    return user.delete('/user/resume',{params})
} 

export function postResume(params){
    return user.post('/user/resume',params)
} 

