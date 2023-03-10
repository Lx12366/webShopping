import axios from "~/axios";

export function getNoticeList(page: number) {
    return axios.get(`/admin/notice/${page}`)
}

export function createNoticeList(data: any) {
    return axios.post(`/admin/notice`, data)
}

export function updateNoticeList(id: number, data: any) {
    return axios.post(`/admin/notice/${id}`, data)
}
export function deleteNoticeList(id: number) {
    return axios.post(`/admin/notice/${id}/delete`)
}