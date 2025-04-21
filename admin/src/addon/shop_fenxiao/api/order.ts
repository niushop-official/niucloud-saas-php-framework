import request from '@/utils/request'

/**
 * 获取分销订单
 * @param params
 * @returns
 */
export function getFenxiaoOrderList(params: Record<string, any>) {
    return request.get('shop_fenxiao/order', { params })
}
