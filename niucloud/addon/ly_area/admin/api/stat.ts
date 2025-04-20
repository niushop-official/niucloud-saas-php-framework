import request from '@/utils/request'

/**
 * 获取代理分红周统计
 */
export function getAreaAgentWeekStat() {
    return request.get('ly_area/stat_area_agent_week')
}

/**
 * 获取代理账户统计
 */
export function getAreaAgentAccountStat() {
    return request.get('ly_area/stat_account')
}

/**
 * 获取代理统计
 */
export function getAreaAgentMemberStat() {
    return request.get('ly_area/stat_area_agent_member')
}

/**
 * 获取代理佣金统计
 */
export function getAreaAgentCommissionStat() {
    return request.get('ly_area/stat_commission')
}

/**
 * 获取代理订单统计
 */
export function getAgentOrderStat() {
    return request.get('ly_area/stat');   
}