import axios from "~/axios"
import { queryParams } from "~/Hook/util"

export function getAgentList(page:any, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/agent/${page}${r}`)
}

export function getAgentOrderList(page:any, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/user_bill/${page}${r}`)
}

export function getAgentStatistics() {
    return axios.get("/admin/agent/statistics")
}

export function getConfig() {
    return axios.get(`/admin/distribution_setting/get`)
}

export function setConfig(data:any) {
    return axios.post(`/admin/distribution_setting/set`, data)
}