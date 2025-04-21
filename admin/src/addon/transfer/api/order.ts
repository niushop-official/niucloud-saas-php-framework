import request from '@/utils/request'

// USER_CODE_BEGIN -- transfer_order
/**
 * 获取转赠支付订单列表
 * @param params
 * @returns
 */
export function getOrderList(params: Record<string, any>) {
    return request.get(`transfer/order`, {params})
}

/**
 * 获取转赠支付订单详情
 * @param order_id 转赠支付订单order_id
 * @returns
 */
export function getOrderInfo(order_id: number) {
    return request.get(`transfer/order/${order_id}`);
}

/**
 * 添加转赠支付订单
 * @param params
 * @returns
 */
export function addOrder(params: Record<string, any>) {
    return request.post('transfer/order', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑转赠支付订单
 * @param order_id
 * @param params
 * @returns
 */
export function editOrder(params: Record<string, any>) {
    return request.put(`transfer/order/${params.order_id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除转赠支付订单
 * @param order_id
 * @returns
 */
export function deleteOrder(order_id: number) {
    return request.delete(`transfer/order/${order_id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- transfer_order
