import { stringify } from 'qs'
import request from '@/plugin/axios'


/////////////////////////服务相关///////////////////////////
export function listAffairApproval(params){
    return request({
        url:`/meeting/listAffairApproval?${stringify(params)}`,
        method:'get',
    })
}

export function listAffairInitiate(){
    return request({
        url:'/meeting/listAffairInitiate',
        method:'get',
    })
}

export function listAffairExecute(params){
    return request({
        url:`/meeting/listAffairExecute?${stringify(params)}`,
        method:'get',
    })
}

export function getJobConnect(id){
    return request({
        url:`/meeting/getJobConnect/${id}`,
        method:'get',
    })
}

export function saveJobConnect(params){
    return request({
        url:`/meeting/saveJobConnect?${stringify(params)}`,
        method:'post',
    })
}

export function getCollaboration(params){
    return request({
        url:`/meeting/selectDictDataByType?${stringify(params)}`,
        method:'get',
    })
}

export function getCollaborationService(params){
    return request({
        url:`/meeting/selectServerByType?${stringify(params)}`,
        method:'get',
    })
}
