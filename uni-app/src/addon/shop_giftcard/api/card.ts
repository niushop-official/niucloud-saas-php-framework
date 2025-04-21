import request from '@/utils/request'

// ************************************** 礼品卡获取 **************************************

/**
 * 获取卡包的分页列表
 * @param params，参数，giftcard_id：礼品卡id，card_no：卡号，status：状态
 */
export function getCardPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/card/bag`, params)
}
/**
 * 获取卡包里对应卡的列表
 * @param params，参数，giftcard_id：礼品卡id
 */
export function getCardList(params: Record<string, any>) {
    return request.get(`shop_giftcard/card/list`, params)
}
/**
 * 获取卡的状态列表
 */
export function getCardStatusList() {
    return request.get(`shop_giftcard/card/status`)
}

/**
 * 获取卡的信息
 * @param card_id   卡id
 */
export function getCardInfo(card_id: any) {
    return request.get(`shop_giftcard/card/info/${ card_id }`)
}

/**
 * 获取卡的详情
 * @param card_id   卡id
 */
export function getCardDetail(card_id: any) {
    return request.get(`shop_giftcard/card/${ card_id }`)
}

/**
 * 激活实体礼品卡
 * @param data   参数，card_no：卡号，card_key：卡密
 */
export function activateCard(data: any) {
    return request.post(`shop_giftcard/card/activate`, data)
}

/**
 * 修改实体礼品卡的封面图片
 * @param params    参数，card_id：卡id，card_cover：卡封面
 */
export function modifyRealCardCover(params: Record<string, any>) {
    return request.put(`shop_giftcard/card/cover`, params, { showSuccessMessage: true })
}

/**
 * 赠予礼品卡 单张
 * @param params   参数，card_id：卡id，blessing：祝福语
 */
export function giveCard(params: Record<string, any>) {
    return request.post(`shop_giftcard/card/give`, params, { showSuccessMessage: false })
}

/**
 * 赠予礼品卡 多张
 * @param params   参数，card_bag_id：卡包id，blessing：祝福语
 */
export function giveCardBatch(params: Record<string, any>) {
    return request.post(`shop_giftcard/card/give_batch`, params, { showSuccessMessage: false })
}
/**
 * 获取礼品卡赠予信息
 * @param give_id   卡id
 */
export function getCardGiveInfo(give_id: any) {
    return request.get(`shop_giftcard/card/give/${ give_id }`)
}

/**
 * 领取礼品卡
 * @param params   参数，give_id：赠予id
 */
export function receiveCard(params: Record<string, any>) {
    return request.post(`shop_giftcard/card/receive`, params)
}

/**
 * 礼品卡使用 兑换卡
 * @param params   card_id： 购买的卡id sku_data[0][sku_id]：商品sku_id sku_data[0][num]:  兑换的商品数量
 */
export function useGoods(params: Record<string, any>) {
    return request.post('shop_giftcard/records/use/goods', params)
}

/**
 * 礼品卡使用 储蓄卡
 * @param params   card_id：
 */
export function useBalance(params: Record<string, any>) {
    return request.post('shop_giftcard/records/use/balance', params)
}