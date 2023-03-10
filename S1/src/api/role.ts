import axios from "~/axios";

export function getRoleList(page: number) {
    return axios.get(`/admin/role/${page}`)
}

export function createRoleList(data: any) {
    return axios.post(`/admin/role`, data)
}

export function updateRoleList(id: number, data: any) {
    return axios.post(`/admin/role/${id}`, data)
}
export function deleteRoleList(id: number) {
    return axios.post(`/admin/role/${id}/delete`)
}

//修改状态
export const updateRoleStatus = (id: any, status: any) => {
    return axios.post(`/admin/role/${id}/update_status`, { status })
}
export const setRoleRules = (id: any, rule_ids: any) => {
    return axios.post(`/admin/role/set_rules`, { id,rule_ids })
}