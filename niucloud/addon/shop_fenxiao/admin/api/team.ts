import request from '@/utils/request'

/**
 * 获取团队分红设置
 * @returns
 */
export function getTeamConfig() {
    return request.get(`shop_fenxiao/team_config`)
}

/**
 * 团队分红设置
 * @param params
 * @returns
 */
export function setTeamConfig(params: Record<string, any>) {
    return request.put(`shop_fenxiao/team_config`, params, { showSuccessMessage: true })
}

/**
 * 获取分红订单
 * @param params
 * @returns
 */
export function getTemaOrderList(params: Record<string, any>) {
    return request.get('shop_fenxiao/team_order', { params })
}
