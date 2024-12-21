import request from '@/utils/request'
/**
 * 获取帮付信息
 */
export function getFriendspayInfo(tradeType : string, tradeId : number) {
    return request.get(`pay/friendspay/info/${tradeType}/${tradeId}`, {}, { showErrorMessage: true })
}