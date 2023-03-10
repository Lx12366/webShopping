import axios from "~/axios";
import { queryParams } from '~/Hook/util'
export function getGoodsList(page: any, query: any = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
}

//批量上架下架商品
export const updateGoodsStatus = (ids: any, status: any) => {
    return axios.post(`/admin/goods/changestatus`, {
        ids,
        status
    })
}

//增删改查
export const createGoods = (data: any) => {
    return axios.post(`/admin/goods`, data)
}

export const deleteGoods = (ids: any) => {
    return axios.post(`/admin/goods/delete_all`, {
        ids
    })
}

//恢复商品api
export function restoreGoods(ids:any){
    return axios.post(`/admin/goods/restore`,{
        ids
    })
}

//彻底删除
export function destroyGoods(ids:any){
    return axios.post(`/admin/goods/destroy`,{
        ids
    })
}

export const updateGoods = (id: any, data: any) => {
    return axios.post(`/admin/goods/${id}`, data)
}

//查看商品资料
export function readGoods(id: any) {
    console.log(id);

    return axios.get(`/admin/goods/read/${id}`)
}

//设置商品轮播图
export function setGoodsBanner(id: any, data: any) {
    return axios.post(`/admin/goods/banners/${id}`, data)
}

//更新商品规格
export function updateGoodsSkus(id: any, data: any) {
    return axios.post(`/admin/goods/updateskus/${id}`, data)
}

//添加规格
export function createGoodsSkusCard(data: any) {
    return axios.post(`/admin/goods_skus_card`, data)
}

//修改商品规格选项
export function updateGoodsSkusCard(id: any, data: any) {
    return axios.post(`/admin/goods_skus_card/${id}`, data)
}



//删除商品规格选项
export function deleteGoodsSkusCard(id: any) {
    return axios.post(`/admin/goods_skus_card/${id}/delete`)
}


//排序商品规格选项
export function sortGoodsSkusCard(data: any) {
    return axios.post(`/admin/goods_skus_card/sort`, data)
}

// /------------------------------------------------------
//添加规格选项的 值
export function createGoodsSkusCardValue(data: any) {
    return axios.post(`/admin/goods_skus_card_value`, data)
}

//修改商品规格选项的值
export function updateGoodsSkusCardValue(id: any, data: any) {
    return axios.post(`/admin/goods_skus_card_value/${id}`, data)
}

//删除商品规格选项 的值
export function deleteGoodsSkusCardValue(id: any) {
    return axios.post(`/admin/goods_skus_card_value/${id}/delete`)
}

//编辑规格值
export function chooseAndSetGoodsSkusCard(id:any,data:any){
    return axios.post(`/admin/goods_skus_card/${id}/set`,data)
}