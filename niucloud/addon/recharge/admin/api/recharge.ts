import request from '@/utils/request'

/***************************************************** 充值订单 ****************************************************/

/**
 * 获取充值订单列表
 * @param params
 * @returns
 */
export function getRechargeOrderList(params: Record<string, any>) {
    return request.get(`recharge/order`, { params })
}

/**
 * 获取充值订单统计
 * @param params
 * @returns
 */
export function getRechargeStat(params: Record<string, any>) {
    return request.get(`recharge/order/stat`, { params })
}

/**
 * 获取充值订单详情
 * @param order_id
 * @returns
 */
export function getRechargeOrderInfo(order_id: number) {
    return request.get(`recharge/order/${ order_id }`);
}

/**
 * 获取充值订单状态列表
 * @returns
 */
export function getRechargeOrderStatusList() {
    return request.get(`recharge/order/status`)
}

/**
 * 获取退款记录
 * @returns
 */
export function getRechargeRefund(params: Record<string, any>) {
    return request.get(`recharge/refund`, { params })
}

/**
 * 获取退款状态
 * @returns
 */
export function getRechargeRefundStatus() {
    return request.get(`recharge/refund/status`)
}

/**
 * 充值订单发起退款
 * @returns
 */
export function rechargeRefund(order_id: number) {
    return request.put(`recharge/refund/${ order_id }`, {}, { showSuccessMessage: true });
}

/**
 * 获取退款统计
 * @returns
 */
export function getRechargeRefundStat() {
    return request.get(`recharge/refund/stat`);
}

/**
 * 获取充值套餐列表
 * @param params
 * @returns
 */
export function getRechargePackageList(params: Record<string, any>) {
    return request.get(`recharge/package`, { params })
}

/**
 * 获取充值套餐状态
 * @returns
 */
export function getRechargePackageStatusList() {
    return request.get(`recharge/package/status`)
}

/**
 * 添加套餐
 * @param params
 * @returns
 */
export function addRechargePackage(params: Record<string, any>) {
    return request.post('recharge/package', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑套餐
 * @param params
 * @returns
 */
export function editRechargePackage(params: Record<string, any>) {
    return request.put(`recharge/package/${ params.recharge_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取充值套餐详情
 * @param params
 * @returns
 */
export function getRechargePackageInfo(params: Record<string, any>) {
    return request.get(`recharge/package/init`, { params });
}

/**
 * 删除套餐
 * @param recharge_id
 * @returns
 */
export function deleteRechargePackage(recharge_id: number) {
    return request.delete(`recharge/package/${ recharge_id }`, { showSuccessMessage: true })
}

/**
 * 设置充值套餐配置
 * @param params
 */
export function setRechargeConfig(params: Record<string, any>) {
    return request.post(`recharge/package/config`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取充值套餐配置
 * @returns
 */
export function getRechargeConfig() {
    return request.get(`recharge/package/config`)
}

/**
 * 修改充值套餐状态
 * @param params
 * @returns
 */
export function editRechargeStatus(params: Record<string, any>) {
    return request.put(`recharge/package/status`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 充值套餐修改排序
 * @param params
 * @returns
 */
export function modifyRechargeSort(params: Record<string, any>) {
    return request.put(`recharge/package/sort`, params, { showSuccessMessage: true })
}

/**
 * 获取充值套餐规则字典
 * @returns
 */
export function getPackageGiftDict() {
    return request.get(`recharge/dict/package_gift`)
}
