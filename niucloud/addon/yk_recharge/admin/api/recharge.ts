import request from '@/utils/request'

/***************************************************** 充值订单 ****************************************************/

/**
 * 获取充值订单列表
 * @param params
 * @returns
 */
export function getYkRechargeOrderList(params: Record<string, any>) {
    return request.get(`yk_recharge/order`, {params})
}

/**
 * 获取充值订单统计
 * @param params
 * @returns
 */
export function getYkRechargeStat(params: Record<string, any>) {
    return request.get(`yk_recharge/order/stat`, {params})
}

/**
 * 获取充值订单详情
 * @param order_id
 * @returns
 */
export function getYkRechargeOrderInfo(order_id: number) {
    return request.get(`yk_recharge/order/${order_id}`);
}

/**
 * 获取充值订单状态列表
 * @returns
 */
export function getYkRechargeOrderStatusList() {
    return request.get(`yk_recharge/order/status`)
}

/**
 * 获取退款记录
 * @returns
 */
export function getYkRechargeRefund(params: Record<string, any>) {
    return request.get(`yk_recharge/refund`, {params})
}

/**
 * 获取退款状态
 * @returns
 */
export function getYkRechargeRefundStatus() {
    return request.get(`yk_recharge/refund/status`)
}

/**
 * 充值订单发起退款
 * @returns
 */
export function ykrechargeRefund(order_id: number) {
    return request.put(`yk_recharge/refund/${order_id}`, {}, {showSuccessMessage: true});
}

/**
 * 获取退款统计
 * @returns
 */
export function getYkRechargeRefundStat() {
    return request.get(`yk_recharge/refund/stat`);
}

/**
 * 获取余额设置
 * @returns
 */
export function getYkRechargeBalanceShow() {
    return request.get(`yk_recharge/setting/show`);
}


/**
 * 获取余额设置详情
 * @param Setting
 */
export function getBalanceInfo(setting_id: number) {
    return request.get(`yk_recharge/setting/${setting_id}`);
}

/**
 * 添加余额设置
 * @param params
 * @returns
 */
export function addBalance(params: Record<string, any>) {
    return request.post('yk_recharge/setting', params, {showSuccessMessage: true})
}

/**
 * 编辑余额设置
 * @param params
 * @returns
 */
export function editBalance(params: Record<string, any>) {
    return request.put(`yk_recharge/setting/${params.setting_id}`, params, {showSuccessMessage: true})
}

/**
 * 余额设置删除
 * @param setting_id
 */
export function deleteBalance(setting_id: number) {
    return request.delete(`yk_recharge/setting/${setting_id}`, {showSuccessMessage: true});
}