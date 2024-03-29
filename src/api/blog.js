import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function fetchList(params){

    return request({
        params,
        url:`${baseURL}/blog/getList`,
        method:'get'
    })

}

export function del(params){
    return request({
        params,
        url:`${baseURL}/blog/del`,
        method:'get'
    })
}