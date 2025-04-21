import request from '@/utils/request'

/***************************************************** 分销 ****************************************************/

/**
 * 获取股东分红设置
 * @returns
 */
export function getConfig() {
  return request.get(`ly_shareholder/config`)
}

/**
 * 获取股东等级列表
 * @returns
 */
export function getLevelList() {
  return request.get(`ly_shareholder/level`)
}

/**
 * 获取股东商品列表【分页】
 * @returns
 */
export function getShareholderGoodsList(params: Record<string, any>) {
  return request.get(`ly_shareholder/goods/pages_of_share`, params)
}
/**
 * 获取股东订单数据统计
 * @returns
 */
export function getShareholderOrderStat() {
  return request.get(`ly_shareholder/shareholder/stat`)
}

/**
 * 获取股东商品列表【组件】
 * @returns
 */
export function getShareholderComponents(params: Record<string, any>) {
  return request.get(`ly_shareholder/goods/components`, params)
}

/**
 * 获取股东等级详情
 * @param id
 * @returns
 */
export function getLevelInfo(id: number) {
  return request.get(`ly_shareholder/level/${id}`)
}

/**
 * 获取股东详情
 * @returns
 */
export function getDetail() {
  return request.get(`ly_shareholder/shareholder/detail`)
}

/**
 * 获取股东账户信息
 * @returns
 */
export function getAccount() {
  return request.get(`ly_shareholder/shareholder/account`)
}

/**
 * 获取股东账户信息
 * @returns
 */
export function getShareholderDetail() {
  return request.get('ly_shareholder/shareholder/detail')
}

/**
 * 股东分红佣金统计
 * @returns
 */
export function getShareholderStat() {
  return request.get('ly_shareholder/order/stat')
}

/**
 * 获取股东信息
 * @returns
 */
export function getShareholderInfo() {
  return request.get('ly_shareholder/shareholder/info')
}
