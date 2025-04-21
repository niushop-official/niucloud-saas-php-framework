import request from '@/utils/request'

/**
 * 订单计算
 * @param params
 * @returns
 */
export function replaceCalculate(params: Record<string, any>) {
    return request.get(`shop_replace_buy/calculate`, { params })
}

/**
 * 订单创建
 * @param params
 * @returns
 */
export function replaceCreate(params: Record<string, any>) {
    return request.post(`shop_replace_buy/create`, params)
}

/**
 * 自提点
 * @param params
 * @returns
 */
export function getReplaceBuyStore(params: Record<string, any>) {
    return request.get(`shop_replace_buy/store`, { params })
}

/**
 * 优惠券
 * @param params
 * @returns
 */
export function getReplaceCoupon(params: Record<string, any>) {
    return request.get(`shop_replace_buy/coupon`, { params })
}

/**
 * 检测订单支付
 * @param params
 * @returns
 */
export function replaceBuyCheck(params: Record<string, any>) {
    return request.get(`shop_replace_buy/check`, { params })
}

/**
 * 支付
 */
export function pay(params: Record<string, any>) {
    return request.post(`pay`, params, {
        showErrorMessage: false,
        showSuccessMessage: false
    })
}
