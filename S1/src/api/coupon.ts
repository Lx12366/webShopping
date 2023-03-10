import axios from '~/axios'

export function getCouponList(page: any) {
    return axios.get(`/admin/coupon/${page}`)
}

export function createCoupon(data: any) {
    return axios.post("/admin/coupon", data)
}

export function updateCoupon(id: any, data: any) {
    return axios.post("/admin/coupon/" + id, data)
}

export function deleteCoupon(id: any) {
    return axios.post(`/admin/coupon/${id}/delete`)
}
//失效按钮api
export function updateCouponStatus(id: any) {
    return axios.post(`/admin/coupon/${id}/update_status`, {
        status: 0
    })
}