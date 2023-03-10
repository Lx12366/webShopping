import axios from "~/axios";
import { queryParams } from '~/Hook/util'

export const login = (username: string, password: string) => {
   return axios.post('admin/login', {
      username,
      password
   })
}

export const getInfo = () => {
   return axios.post('admin/getinfo')
}

export const updatePassword = (data: any) => {
   return axios.post('/admin/updatepassword', data)
}

export function getManagerList(page: any, query: any = {}) {
   //判断传进来的对象是否存在  存在就拼接到url后面
   let r = queryParams(query)

   return axios.get(`/admin/manager/${page}${r}`)
}

export const updateMangerStatus = (id: any, status: any) => {
   return axios.post(`/admin/manager/${id}/update_status`, { status })
}
//增删改查
export const createManager = (data:any) => {
   return axios.post(`/admin/manager`, data)
}

export const deleteManager = (id: any) => {
   return axios.post(`/admin/manager/${id}/delete`)
}

export const updateManager = (id: any, data: any) => {
   return axios.post(`/admin/manager/${id}`,data)
}


