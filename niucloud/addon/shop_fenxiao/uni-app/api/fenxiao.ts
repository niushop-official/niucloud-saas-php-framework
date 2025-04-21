import request from '@/utils/request'


/***************************************************** 分销 ****************************************************/

/**
 * 获取分销设置
 * @returns
 */
export function getConfig() {
    return request.get(`shop_fenxiao/config`)
}

/**
 * 获取分销等级列表
 * @returns
 */
export function getLevelList() {
    return request.get(`shop_fenxiao/level`)
}

/**
 * 获取分销商品列表【分页】
 * @returns
 */
export function getFenxiaoGoodsList(params: Record<string, any>) {
    return request.get(`shop_fenxiao/goods/pages_of_share`, params)
}

/**
 * 获取分销商品列表【组件】
 * @returns
 */
export function getFenxiaoComponents(params: Record<string, any>) {
    return request.get(`shop_fenxiao/goods/components`, params)
}

/**
 * 获取分销等级详情
 * @param id
 * @returns
 */
export function getLevelInfo(id: number) {
    return request.get(`shop_fenxiao/level/${ id }`)
}

/**
 * 检测分销商申请
 * @returns
 */
export function applyCheck() {
    return request.get(`shop_fenxiao/apply/check`)
}

/**
 * 获取分销会员信息
 * @returns
 */
export function getMemberInfo() {
    return request.get(`shop_fenxiao/fenxiao_member`)
}

/**
 * 分销商申请信息
 * @returns
 */
export function applyInfo() {
    return request.get(`shop_fenxiao/apply/info`)
}

/**
 * 申请分销商
 * @returns
 */
export function apply() {
    return request.post(`shop_fenxiao/apply`)
}

/**
 * 获取申请分销商的条件
 * @returns
 */
export function getCheck() {
    return request.get(`/shop_fenxiao/apply/get_check`)
}

/**
 * 获取分销商详情
 * @returns
 */
export function getDetail() {
    return request.get(`shop_fenxiao/fenxiao/detail`)
}

/**
 * 获取分销商账户信息
 * @returns
 */
export function getAccount() {
    return request.get(`shop_fenxiao/fenxiao/account`)
}

/**
 * 获取分销商账户信息
 * @returns
 */
export function getFenxiaoDetail() {
    return request.get('shop_fenxiao/fenxiao/detail')
}

/**
 * 分销订单分页列表
 * @returns
 */
export function getFenxiaoOrder(params: Record<string, any>) {
    return request.get("shop_fenxiao/order/fenxiao", params)
}

/**
 * 分销佣金统计
 * @returns
 */
export function getFenxiaoStat() {
    return request.get("shop_fenxiao/order/fenxiao/stat")
}

/**
 * 获取下级分销商
 * @returns
 */
export function getChildFenxiao() {
    return request.get("shop_fenxiao/fenxiao/child_fenxiao")
}

/**
 * 获取我的团队
 * @returns
 */
export function getFenxiaoTeam() {
    return request.get("shop_fenxiao/fenxiao/team")
}

/**
 * 获取分销商信息
 * @returns
 */
export function getFenxiaoInfo() {
    return request.get("shop_fenxiao/fenxiao/info")
}
