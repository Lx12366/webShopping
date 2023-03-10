import axios from '~/axios'

export function getImageList(id: any, page = 1) {
   return axios.get(`/admin/image_class/${id}/image/${page}`)
}
export function updageImageList(id: any, name: any) {
   return axios.post(`/admin/image/${id}`, { name })
}
export function deleteImageList(ids: any) {
   return axios.post(`/admin/image/delete_all`, {ids})
}

export const upLoadImage =  import.meta.env.VITE_APP_BASE_API + '/admin/image/upload'