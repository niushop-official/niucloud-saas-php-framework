import request from '@/utils/request'

/**
 * 创建订单
 * @param {any} params 
 * @return 
 */
export function createOrder(params) {
	return request.post(`tk_vip/order/create`, params)
}
export function getOrderList(params) {
	return request.get(`tk_vip/order/lists`, params)
}