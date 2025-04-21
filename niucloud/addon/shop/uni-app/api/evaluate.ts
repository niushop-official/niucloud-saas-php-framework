import request from '@/utils/request'

/**
 * 获取商品评价
 */
export function getEvaluateList(params: Record<string, any>) {
    return request.get(`shop/goods/evaluate`, params)
}

/**
 * 获取评价详情
 */
export function getEvaluateInfo(id: any) {
    return request.get(`shop/goods/evaluate/${ id }`)
}

/**
 * 提交评论
 */
export function setOrderEvaluate(params: Record<string, any>) {
    return request.post('shop/goods/evaluate', params, { showSuccessMessage: true })
}

/**
 * 获取订单评价
 */
export function getOrderEvaluate(id: any) {
    return request.get(`shop/order/evaluate/${ id }`)
}
