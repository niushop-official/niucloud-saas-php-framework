import request from '@/utils/request'

/**
 * 获取礼品卡订单列表
 * @param params
 * @returns
 */
export function getShopGiftcardOrderList(params: Record<string, any>) {
    return request.get(`shop_giftcard/order`, { params })
}

/**
 * 获取礼品卡订单详情
 * @param order_id 礼品卡订单order_id
 * @returns
 */
export function getShopGiftcardOrderInfo(order_id: number) {
    return request.get(`shop_giftcard/order/${ order_id }`);
}

/**
 * 编辑礼品卡订单备注
 * @param params
 * @returns
 */
export function setShopGiftcardOrderRemark(params: Record<string, any>) {
    return request.put(`shop_giftcard/order/remark/${ params.order_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 关闭礼品卡订单
 * @param order_id
 * @returns
 */
export function closeShopGiftcardOrder(order_id: number) {
    return request.put(`shop_giftcard/order/close/${ order_id }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取订单状态
 * @return
 */
export function getOrderStatus() {
    return request.get(`shop_giftcard/order/status`)
}

/**
 * 获取支付类型
 */
export function getOrderPayType() {
    return request.get(`shop_giftcard/order/pay/type`)
}
