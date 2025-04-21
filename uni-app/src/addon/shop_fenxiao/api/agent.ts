import request from '@/utils/request'


/***************************************************** 代理 ****************************************************/
/**
 * 渠道代理是否开启
 * @returns
 */
export function getOrderAgentConfig() {
    return request.get("shop_fenxiao/order/agent/config")
}

/**
 * 代理订单分页列表
 * @returns
 */
export function getAgentOrder(params: Record<string, any>) {
    return request.get("shop_fenxiao/order/agent", params)
}

/**
 * 团队分红佣金统计
 * @returns
 */
export function getAgentStat() {
    return request.get("shop_fenxiao/order/agent/stat")
}
