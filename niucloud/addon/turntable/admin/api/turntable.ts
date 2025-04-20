import request from '@/utils/request'

/**
 * 获取活动列表
 * @param params
 * @returns
 */
export function getSearchListApi(params: Record<string, any>){
    return request.get(`turntable/search`, {params})
}
/**
 * 获取游戏添加/编辑初始化数据
 * @param params
 */
export function getGamesInit(params:Record<string, any>){
    return request.get(`turntable/init`,{params})
}
/**
 * 获取优惠券列表
 * @returns
 */
export function getCouponListApi() {
    return request.get(`shop/goods/coupon`)
}

/**
 * 获取订单列表
 * @returns
 */
export function getGamesDetailApi(params:Record<string, any>) {
    return request.get(`turntable/detail`,{params})
}
/**
 * 新增抽奖
 */
export function createGamesApi(params: Record<string, any>){
    return request.post(`turntable/create`, params, {showSuccessMessage: true})
}

/**
 * 修改抽奖
 */
export function updateGamesApi(params: Record<string, any>){
    return request.post(`turntable/update`, params, {showSuccessMessage: true})
}

/**
 * 删除抽奖
 */
export function deleteGamesApi(params: Record<string, any>){
    return request.post(`turntable/delete`, params, {showSuccessMessage: true})
}

/**
 * 关闭活动
 */
export function closeGamesApi(params: Record<string, any>){
    return request.post(`turntable/close`,params,{showSuccessMessage: true})
}

/**
 * 开启活动
 */
export function openGamesApi(params: Record<string, any>){
    return request.post(`turntable/open`,params,{showSuccessMessage: true})
}

/**
 *权重分布概率器
 */
export function calculateApi(params: Record<string, any>){
    return request.post(`turntable/calculate`,params)
}

/**
 * 获取用户列表
 */
export function getMemberListApi(){
    return request.get(`member/member/list`)
}