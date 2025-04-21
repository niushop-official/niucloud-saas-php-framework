import request from '@/utils/request'


/***************************************************** 订单管理 ****************************************************/

/**
 * 获取订单列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`o2o/order`, {params})
}

/**
 * 获取订单详情
 * @param orderId 订单orderId
 * @returns
 */
export function getOrderDetail(orderId: number) {
    return request.get(`o2o/order/${orderId}`);
}

/**
 * 获取订单状态
 */
export function getOrderStatus() {
    return request.get('o2o/order/status');
}
/**
 * 派单
 */
export function setSendOders(params: Record<string, any>) {
    return request.post('o2o/order/dispatch',params, {showErrorMessage: true, showSuccessMessage: true});
}


/**
 * 获取交易设置
 */
export function getOrderConfig() {
    return request.get('o2o/order/config');
}
/**
 * 设置交易设置
 */
export function setOrderConfig(params: Record<string, any>) {
    return request.post('o2o/order/config',params, {showErrorMessage: true, showSuccessMessage: true});
}


/**
 * 获取维权列表
 */
export function getRefundList(params: Record<string, any>) {
    return request.get('o2o/refund', {params});
}

/**
 * 获取维权详情
 */
export function getRefundDetail(refundId: number) {
    return request.get(`o2o/refund/${refundId}`);
}

/**
 * 获取维权状态
 */
export function getRefundStatus() {
    return request.get('o2o/refund/status');
}

/**
 * 确认退款
 * @param params
 * @returns
 */
export function confirmRefund(params: Record<string, any>) {
    return request.put(`o2o/refund/${params.refund_id}`,params);
}

/**
 * 拒绝退款
 * @param params
 * @returns
 */
export function refuseRefund(params: Record<string, any>) {
    return request.put(`o2o/refund/refuse/${params.refund_id}`, params);
}
/**
 * 获取预约面板
 * @param params
 * @returns
 */
export function getReserveBoard(params: Record<string, any>) {
    return request.get(`o2o/order/board`, {params});
}
