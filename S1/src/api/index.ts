import axios from "~/axios";
//首页数据
export const getStatistics1 = () => {
    return axios.get('/admin/statistics1')
}

export const getStatistics2 = () => {
    return axios.get('/admin/statistics2')
}
export const getStatistics3 = (type: any) => {
    return axios.get('/admin/statistics3?type=' + type)
}
