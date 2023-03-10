//商品评语模块
import axios from '~/axios'
import { queryParams } from "~/Hook/util"

export function getGoodsCommentList(page:any,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/goods_comment/${page}${r}`)
}


export function updateGoodsCommentStatus(id:any,status:any){
    return axios.post(`/admin/goods_comment/${id}/update_status`,{
        status
    })
}

export function reviewGoodsComment(id:any,data:any){
    return axios.post(`/admin/goods_comment/review/${id}`,{
        data
    })
}

