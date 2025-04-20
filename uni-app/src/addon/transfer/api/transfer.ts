
import request from '@/utils/request'

export function getConfig() {
    return request.get(`transfer/config`)
}

export function transfer_checkmember(data) {
    return request.get(`transfer/checkmember`,data)
}
export function transfer_balance(data) {
    return request.get(`transfer/transfer_balance`,data)
}
export function transfer_coupon(data) {
    return request.get(`transfer/transfer_coupon`,data)
}
export function transfer_point(data) {
    return request.get(`transfer/transfer_point`,data)
}
export function transfer_commission(data) {
    return request.get(`transfer/transfer_commission`,data)
}


/**
 * 获取我的优惠券
 */
export function getMyCouponList(params: Record<string, any>) {
    return request.get(`shop/member/coupon`, params)
}
