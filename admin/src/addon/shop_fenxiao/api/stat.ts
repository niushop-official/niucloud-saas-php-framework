import request from '@/utils/request'

/**
 * 获取分销周统计
 */
export function getFenxiaoWeekStat() {
    return request.get('shop_fenxiao/stat_fenxiao_week')
}

/**
 * 获取分销账户统计
 */
export function getFenxiaoAccountStat() {
    return request.get('shop_fenxiao/stat_account')
}

/**
 * 获取分销商统计
 */
export function getFenxiaoMemberStat() {
    return request.get('shop_fenxiao/stat_fenxiao_member')
}

/**
 * 获取分销商佣金统计
 */
export function getFenxiaoCommissionStat() {
    return request.get('shop_fenxiao/stat_commission')
}