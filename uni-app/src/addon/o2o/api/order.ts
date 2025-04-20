import request from '@/utils/request'

/***************************************************** 订单 ***************************************************/
/**
 * 订单确认
 */
export function orderConfirm(params: AnyObject) {
    return request.get(`o2o/order/confirm`, params)
}

/**
 * 订单计算
 */
export function orderCalculate(params: AnyObject) {
    return request.post(`o2o/order/calculate`, params)
}

/**
 * 订单创建
 */
export function orderCreate(params: AnyObject) {
    return request.post(`o2o/order/create`, params)
}

/**
 * 获取订单列表
 * @param params
 * @returns
 *
 */
export function getOrderList(params: AnyObject) {
    return request.get('o2o/order', params);
}

/**
 * 获取订单详情
 * @param orderId
 * @returns
 *
 */
export function getOrderDetail(orderId: Number) {
    return request.get(`o2o/order/${ orderId }`);
}

/**
 * 获取订单状态
 * @returns
 *
 */
export function getOrderStatus() {
    return request.get(`o2o/order/status`);
}

/**
 * 取消订单
 * @param orderId
 * @returns
 */
export function cancelOrder(orderId: number) {
    return request.put(`o2o/order/cancel/${ orderId }`, {}, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除订单
 * @param orderId
 * @returns
 */
export function deleteOrder(orderId: number) {
    return request.delete(`o2o/order/${ orderId }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 申请退款
 * @params
 * @returns
 */
export function refundApply(params: AnyObject) {
    return request.post(`o2o/refund/apply`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取退款详情
 * @param refundId
 * @returns
 */
export function getRefundDetail(refundId: number) {
    return request.get(`o2o/refund/${ refundId }`)
}

/**
 * 取消退款申请
 * @param refundId
 * @returns
 */
export function cancelRefund(refundId: number) {
    return request.put(`o2o/refund/cancel/${ refundId }`)
}

/**
 * 获取退款原因
 * @returns
 */
export function getRefundReason() {
    return request.get(`o2o/refund/reason`)
}

/**
 * 获取退款状态
 * @returns
 */
export function getRefundStatus() {
    return request.get(`o2o/refund/status`)
}

/**
 * 获取退款列表
 * @param params
 * @returns
 *
 */
export function getRefundList(params: AnyObject) {
    return request.get('o2o/refund/lists', params);
}

/**
 * 技师端获取退款详情
 * @param refundId
 * @returns
 */
export function getOrderRefundDetail(refundId: number) {
    return request.get(`o2o/refund/orderRefund/${ refundId }`)
}

/**
 * 获取订单角标数据
 */
export function getOrderNum() {
    return request.get(`o2o/order/num`)
}