import request from '@/utils/request'


/***************************************************** 团队 ****************************************************/
/**
 * 团队分红是否开启
 * @returns
 */
export function getOrderTeamConfig() {
    return request.get("shop_fenxiao/order/team/config")
}

/**
 * 团队订单分页列表
 * @returns
 */
export function getTeamOrder(params: Record<string, any>) {
    return request.get("shop_fenxiao/order/team", params)
}


/**
 * 团队分红佣金统计
 * @returns
 */
export function getTeamStat() {
    return request.get("shop_fenxiao/order/team/stat")
}