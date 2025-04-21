import request from '@/utils/request'

/**
 * 获取区域分红奖励设置
 * @returns
 */
export function getConfig() {
  return request.get(`ly_area/config`)
}

/**
 * 获取区域分红等级列表
 * @returns
 */
export function getLevelList() {
  return request.get(`ly_area/level/lists`)
}

/**
 * 获取区域分红等级详情
 * @param id
 * @returns
 */
export function getLevelInfo(id: number) {
  return request.get(`ly_area/level/${id}`)
}

/**
 * 获取区域分红商品列表【分页】
 * @returns
 */
export function getAreaGoodsList(params: Record<string, any>) {
  return request.get(`ly_area/goods/pages_of_share`, params)
}
/**
 * 获取区域分红订单数据统计
 * @returns
 */
export function getAreaOrderStat() {
  return request.get(`ly_area/agent/stat`)
}

/**
 * 获取区域分红商品列表【组件】
 * @returns
 */
export function getAgentComponents(params: Record<string, any>) {
  return request.get(`ly_area/goods/components`, params)
}

/**
 * 获取区域分红会员详情
 * @returns
 */
export function getDetail() {
  return request.get(`ly_area/agent/detail`)
}

/**
 * 获取区域分红账户信息
 * @returns
 */
export function getAccount() {
  return request.get(`ly_area/agent/account`)
}

/**
 * 区域分红分红佣金统计
 * @returns
 */
export function getAgentStat() {
  return request.get('ly_area/agent/accountdetail')
}

/**
 * 获取区域分红信息
 * @returns
 */
export function getInfo() {
  return request.get('ly_area/agent/info')
}


/**
 * 获取奖励记录
 * @returns
 */
export function getReward(params: Record<string, any>) {
  return request.get('ly_area/agent/reward', params)
}

/**
 * 获取团队
 * @returns
 */
export function getTeam(params: Record<string, any>) {
  return request.get('ly_area/agent/lower_list', params)
}

/**
 * 获取代理区域订单统计
 * @returns
 */
export function getOrderStatByArea(params: Record<string, any>) {
	return request.get('ly_area/agent/area_order_stat', params)
}

/**
 * 获取当前代理区域所有的下级代理
 * @returns
 * */
export function getTeamAgent() {
	return request.get('ly_area/agent/teamAgent')
}


