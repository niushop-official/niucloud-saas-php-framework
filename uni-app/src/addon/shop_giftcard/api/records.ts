import request from '@/utils/request'

// ************************************** 礼品卡会员领取记录 **************************************

/**
 * 送出的礼品卡分页列表
 */
export function getCardGiveRecordsPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/member_records/give`, params)
}

/**
 * 送出的礼品卡详情
 */
export function getCardGiveRecordsDetail(member_card_id: any) {
    return request.get(`shop_giftcard/member_records/give/${ member_card_id }`)
}

/**
 * 收到的礼品卡分页列表
 */
export function getCardReceiveRecordsPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/member_records/receive`, params)
}