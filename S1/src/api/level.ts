import axios from '~/axios'

export function getUserLevelList(page:any){
    return axios.get(`/admin/user_level/${page}`)
}

export function createUserLevel(data:any){
    return axios.post("/admin/user_level",data)
}

export function updateUserLevel(id:any,data:any){
    return axios.post("/admin/user_level/"+id,data)
}

export function deleteUserLevel(id:any){
    return axios.post(`/admin/user_level/${id}/delete`)
}

export function updateUserLevelStatus(id:any,status:any){
    return axios.post(`/admin/user_level/${id}/update_status`,{
        status
    })
}