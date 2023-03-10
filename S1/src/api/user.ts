import axios from '~/axios'
import { queryParams } from "~/Hook/util"

export function getUserList(page:any,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/user/${page}${r}`)
}


export function updateUserStatus(id:any,status:any){
    return axios.post(`/admin/user/${id}/update_status`,{
        status
    })
}


export function createUser(data:any){
    return axios.post(`/admin/user`,data)
}

export function updateUser(id:any,data:any){
    return axios.post(`/admin/user/${id}`,data)
}

export function deleteUser(id:any){
    return axios.post(`/admin/user/${id}/delete`)
}