import request from '@/utils/request'

/**
 * 获取股东分红周统计
 */
export function getShareholderWeekStat() {
    return request.get('ly_shareholder/stat_shareholder_week')
}

/**
 * 获取股东账户统计
 */
export function getShareholderAccountStat() {
    return request.get('ly_shareholder/stat_account')
}

/**
 * 获取股东统计
 */
export function getShareholderMemberStat() {
    return request.get('ly_shareholder/stat_shareholder_member')
}

/**
 * 获取股东佣金统计
 */
export function getShareholderCommissionStat() {
    return request.get('ly_shareholder/stat_commission')
}

/**
 * 获取股东订单统计
 */
export function getShareholderOrderStat() {
    return request.get('ly_shareholder/stat');   
}