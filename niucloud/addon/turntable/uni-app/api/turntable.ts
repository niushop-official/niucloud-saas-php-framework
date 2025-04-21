import request from '@/utils/request'

/**
 * 获取活动信息
 */
export function getGameInfoApi(params: Record<string, any>){
    return request.get(`turntable/info`,params)
}

/**
 * 抽奖
 * */
export function lotteryApi(params: Record<string, any>){
    return request.post(`turntable/lottery`,params)
}
/**
 * 获取用户信息
 */
export function getMemberInfo() {
    return request.get(`member/member`)
}

/**获取我的抽奖信息*/
export function gameDrawRecordApi(params: Record<string, any>){
    return request.get(`turntable/gameDrawRecord`,params)
}
/**保存用户收货地址*/
export function saveAddressApi(params: Record<string, any>){
    return request.post(`turntable/saveAddress`,params)
}