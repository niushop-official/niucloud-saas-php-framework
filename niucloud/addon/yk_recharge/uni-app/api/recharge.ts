import request from '@/utils/request'

/**
 * 发起充值
 */
export function createRecharge(data: AnyObject) {
    return request.post('yk_recharge/recharge', data, {showErrorMessage: true})
}

/**
 * 充值记录列表
 */
export function getRechargeList(data: AnyObject) {
    return request.get('yk_recharge/recharge', data, {showErrorMessage: true})
}

/**
 * 充值记录详情
 */
export function getRechargeDetail(id: number) {
    return request.get(`yk_recharge/recharge/${id}`, {}, {showErrorMessage: true})
}

/**
 * 充值记录详情
 */
export function getRechargeCfgList() {
    return request.get(`yk_recharge/rechargeList`, {}, {showErrorMessage: true})
}

/**
 * 充值记录状态列表
 */
export function getRechargeStatusList() {
    return request.get('yk_recharge/recharge/status')
}
