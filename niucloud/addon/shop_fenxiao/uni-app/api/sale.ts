import request from '@/utils/request'

/**
 * 销售奖励是否开启
 * @returns
 */
export function getSaleConfig() {
    return request.get("shop_fenxiao/sale/config")
}

/**
 * 获取会员销售奖励列表
 * @returns
 */
export function getSaleMemberList(params: Record<string, any>) {
    return request.get("shop_fenxiao/sale_member", params)
}

/**
 * 获取会员销售奖励最新列表
 * @returns
 */
export function getSaleMemberNowList() {
    return request.get("shop_fenxiao/sale_ranking_now")
}

/**
 * 获取会员销售奖励佣金数据
 * @returns
 */
export function getSaleMemberCommission() {
    return request.get("shop_fenxiao/sale_member_commission")
}

/**
 * 获取会员销售奖励详情
 * @returns
 */
export function getSaleMemberInfo(id: number) {
    return request.get(`shop_fenxiao/sale_member/${ id }`)
}

/**
 * 获取销售排行榜
 * @returns
 */
export function getSaleRanking(id: number) {
    return request.get(`shop_fenxiao/sale_ranking/${ id }`)
}