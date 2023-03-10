import axios from '~/axios'

export function getSkusList(page:any){
    return axios.get(`/admin/skus/${page}`)
}

export function createSkus(data:any){
    return axios.post("/admin/skus",data)
}

export function updateSkus(id:any,data:any){
    return axios.post("/admin/skus/"+id,data)
}

export function deleteSkus(ids:any){
    ids = !Array.isArray(ids) ? [ids] : ids
    return axios.post(`/admin/skus/delete_all`,{ ids })
}

export function updateSkusStatus(id:any,status:any){
    return axios.post(`/admin/skus/${id}/update_status`,{
        status
    })
}