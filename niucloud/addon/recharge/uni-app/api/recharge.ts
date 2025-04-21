import request from '@/utils/request'

/**
 * 发起充值
 */
export function createRecharge(data: AnyObject) {
    return request.post('recharge/recharge', data, { showErrorMessage: true })
}

/**
 * 充值记录状态列表
 */
export function getRechargeStatusList() {
    return request.get('recharge/recharge/status')
}

/**
 * 充值记录列表
 */
export function getRechargeList(data: AnyObject) {
    return request.get('recharge/recharge', data, { showErrorMessage: true })
}

/**
 * 充值记录详情
 */
export function getRechargeDetail(id: number) {
    return request.get(`recharge/recharge/${ id }`, {}, { showErrorMessage: true })
}

/**
 * 充值套餐列表
 */
export function getRechargePackageList() {
    return request.get('recharge/package')
}
