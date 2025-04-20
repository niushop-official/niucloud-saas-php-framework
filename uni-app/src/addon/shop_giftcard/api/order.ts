import request from '@/utils/request'

// ************************************** 礼品卡订单 **************************************

/**
 * 获取礼品卡订单状态列表
 */
export function getGiftCardOrderStatus() {
    return request.get(`shop_giftcard/order/status`)
}

/**
 * 获取礼品卡订单列表
 */
export function getGiftcardOrder(params: Record<string, any>) {
    return request.get(`shop_giftcard/order`, params)
}

/**
 * 获取礼品卡订单详情
 */
export function getGiftcardOrderDetail(order_id: any) {
    return request.get(`shop_giftcard/order/${ order_id }`)
}

/**
 * 礼品卡订单创建计算
 * @param params    参数，giftcard_data：{ giftcard_id :礼品卡id，num：购买数量，material_id：礼品卡封面id }
 */
export function orderCreateCalculate(params: Record<string, any>) {
    return request.get('shop_giftcard/order_create/calculate', params)
}

/**
 * 礼品卡订单创建
 * @param params    参数，order_key：订单key，member_remark：会员留言信息
 */
export function orderCreate(params: Record<string, any>) {
    return request.post('shop_giftcard/order_create/create', params)
}

/**
 * 关闭订单
 */
export function orderClose(order_id: number) {
    return request.put(`shop_giftcard/order/close/${ order_id }`, {}, { showSuccessMessage: true })
}