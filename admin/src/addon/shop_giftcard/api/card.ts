import request from '@/utils/request'

/**
 * 获取礼品卡获取分页列表
 * @param params
 * @returns
 */
export function getGiftcardCardPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/card`, { params })
}

/**
 * 获取礼品卡获取卡详情
 * @param card_id
 */
export function getGiftcardCardDetail(card_id: number) {
    return request.get(`shop_giftcard/giftcard/card/${ card_id }`);
}

/**
 * 实体礼品卡 制作卡密
 * @param params
 * @returns
 */
export function makeCard(params: Record<string, any>) {
    return request.post('shop_giftcard/giftcard/makeCard', params, {
        showErrorMessage: true,
        showSuccessMessage: false
    })
}

/**
 * 删除礼品卡获取
 * @param card_id
 * @returns
 */
export function deleteGiftcardCard(card_id: number) {
    return request.delete(`shop_giftcard/giftcard/card/${ card_id }`, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取卡的来源列表
 * @returns
 */
export function getGiftcardCardSourceList() {
    return request.get(`shop_giftcard/giftcard/card/source`)
}


/**
 * 获取卡的状态
 * @param params
 * @returns
 */
export function getGiftcardCardStatusList(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/card/status`, { params })
}