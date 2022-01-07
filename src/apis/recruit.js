import { RecruitInstance as recruit } from './axios'

export function addPosition(params){
    return recruit.post('/enterprise/position',params)
}

export function deletePosition(params){
    return recruit.delete('/enterprise/position',{params})
}

export function modifyPosition(params){
    return recruit.put('/enterprise/position',params)
}

//企业获取用户信息
export function getCompanyAllPosition(params){
    return recruit.get('/position/all',{params})
}

//用户查看推荐岗位
export function getRecommendPositions(params){
    return recruit.get('/position/recommend',{params})
}

export function getPositionDetails(params){
    return recruit.get('/position/specified', {params})
}

export function postPositionApplication(params){
    return recruit.post('/application',params)
}

export function deletePositionApplication(params){
    return recruit.delete('/application',{params})
}

export function getAllApplicationPosition(params){
    return recruit.get('/application',{params})
}

export function getAllApplicants(params){
    return recruit.get('/applicants',{params})
}

// 得到申请过的信息
export function getPostedRecruitments(params){
    return recruit.get('/application', {params})
}