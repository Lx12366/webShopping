import axios from '~/axios'

export function getCategoryList(){
    return  axios.get("/admin/category")
}

export function createCategory(data:any){
    return axios.post("/admin/category",data)
}

export function updateCategory(id:any,data:any){
    return axios.post("/admin/category/"+id,data)
}

export function updateCategoryStatus(id:any,status:any){
    return axios.post(`/admin/category/${id}/update_status`,{
        status
    })
}

export function deleteCategory(id:any){
    return axios.post(`/admin/category/${id}/delete`)
}

export function getCategoryGoods(id:any){
    return  axios.get(`/admin/app_category_item/list?category_id=${id}`)
}