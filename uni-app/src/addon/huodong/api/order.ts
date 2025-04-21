import request from '@/utils/request'

export function SubmitOrder(data: AnyObject) {
    return request.post('huodong/order/create', data, {showErrorMessage: true})
}
export function getOrderList(data: AnyObject) {
    return request.get('huodong/order/list', data, {showErrorMessage: true})
}
export function getOrderDetail(id: number) {
    return request.get(`huodong/order/detail/${id}`, {}, {showErrorMessage: true})
}
export function closeOrder(id: number) {
    return request.get(`huodong/order/close/${id}`, {}, {showErrorMessage: true})
}
export function getOrderStatus(data: AnyObject) {
    return request.get('huodong/order/status', data, {showErrorMessage: true})
}
export function hexiaoOrder(order_no,data) {
    return request.get(`huodong/order/hexiao/${order_no}`, data, {showErrorMessage: true})
}
