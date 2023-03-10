import axios from "~/axios";
//权限管理  数据请求
export function getRuleList(page: any) {
    return axios.get(`/admin/rule/${page}`)
}

export function createRule(data: any) {
    return axios.post(`/admin/rule`, data)
}
export function updateRule(id: any, data: any) {
    return axios.post(`/admin/rule/` + id, data)
}
//修改状态
export const updateRuleStatus = (id: any, status: any) => {
    return axios.post(`/admin/rule/${id}/update_status`, { status })
}
//删除
export const deleteRule = (id: any) => {
    return axios.post(`admin/rule/${id}/delete`)
}