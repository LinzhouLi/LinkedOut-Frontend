import {RecruitInstance as recruit} from './axios'

export function addPosition(params){
    return recruit.post('/recruit/enterprise/position',params)
}

export function deletePosition(params){
    return recruit.delete('/recruit/enterprise/position',{params})
}

export function modifyPosition(params){
    return recruit.put('/recruit/enterprise/position',params)
}

export function getCompanyAllPosition(params){
    return recruit.get('/recruit/position/all',{params})
}

//用户查看推荐岗位
export function getRecommendPositions(params){
    return recruit.get('/recruit/position/recommend',{params})
}

export function getPositionDetails(params){
    return recruit.get('/recruit/position/specified',{params})
}

export function postPositionApplication(params){
    return recruit.post('/recruit/application',params)
}

export function deletePositionApplication(params){
    return recruit.delete('/recruit/application',{params})
}

export function getAllApplicationPosition(params){
    return recruit.get('/recruit/application',{params})
}

export function getAllApplicants(params){
    return recruit.get('/position/apply',{params})
}