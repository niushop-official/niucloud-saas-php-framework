import request from '@/utils/request'

/***************************************************** 分销 ****************************************************/

/**
 * 获取链动奖励设置
 * @returns
 */
export function getConfig() {
  return request.get(`ly_lian/config`)
}

/**
 * 获取链动等级列表
 * @returns
 */
export function getLevelList() {
  return request.get(`ly_lian/level`)
}

/**
 * 获取链动等级详情
 * @param id
 * @returns
 */
export function getLevelInfo(id: number) {
  return request.get(`ly_lian/level/${id}`)
}

/**
 * 获取链动商品列表【分页】
 * @returns
 */
export function getLianGoodsList(params: Record<string, any>) {
  return request.get(`ly_lian/goods/pages_of_share`, params)
}
/**
 * 获取链动订单数据统计
 * @returns
 */
export function getLianOrderStat() {
  return request.get(`ly_lian/lian_member/stat`)
}

/**
 * 获取链动商品列表【组件】
 * @returns
 */
export function getLianComponents(params: Record<string, any>) {
  return request.get(`ly_lian/goods/components`, params)
}

/**
 * 获取链动会员详情
 * @returns
 */
export function getDetail() {
  return request.get(`ly_lian/lian_member/detail`)
}

/**
 * 获取链动账户信息
 * @returns
 */
export function getAccount() {
  return request.get(`ly_lian/lian_member/account`)
}

/**
 * 链动分红佣金统计
 * @returns
 */
export function getLianStat() {
  return request.get('ly_lian/lian_member/account')
}

/**
 * 获取链动信息
 * @returns
 */
export function getInfo() {
  return request.get('ly_lian/lian_member/info')
}

/**
 * 获取直推下级
 * @returns
 */
export function getChildList() {
  return request.get('ly_lian/lian_member/recommendChild')
}

/**
 * 获取直推boss
 * @returns
 */
export function getBossList() {
  return request.get('ly_lian/lian_member/recommendBossChild')
}

/**
 * 获取奖励记录
 * @returns
 */
export function getReward(params: Record<string, any>) {
  return request.get('ly_lian/lian_member/reward', params)
}
/**
 * 获取团队
 * @returns
 */
export function getTeam(params: Record<string, any>) {
  return request.get('ly_lian/lian_member/team', params)
}


/**
 * 获取前2直推
 * @returns
 */
export function getRecommendTop2(){
	return request.get('ly_lian/lian_member/firstRecommend')
}


/**
 * 获取绩效任务期限
 * @returns
 */
export function getTaskLimitDays(){
	return request.get('ly_lian/lian_member/taskLimitDays')
}