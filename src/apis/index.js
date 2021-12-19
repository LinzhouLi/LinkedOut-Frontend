import {UserInstance} from './axios'




export function getEmailCode(params){
    return UserInstance.post()
}