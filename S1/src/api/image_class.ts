import axios from "~/axios";

export const getImageClassList = (page: number) => {
    return axios.get(`/admin/image_class/${page}`)
}
export const createImageClass = (data: any) => {
    return axios.post(`/admin/image_class`, data)
}

export const updateImageClass = (id: any, data: any) => {
    return axios.post(`/admin/image_class/${id}`, data)
}

export const delImageClass = (id: any) => {
    return axios.post(`/admin/image_class/${id}/delete`)
}

