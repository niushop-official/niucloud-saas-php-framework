import request from '@/utils/request'

// ************************************** 礼品卡活动 **************************************

/**
 * 获取礼品卡活动分类列表
 * @param params，参数，category_id：礼品卡分类id，card_name：礼品卡名称
 */
export function getGiftCardPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard`, params)
}

/**
 * 获取礼品卡活动列表（供自定义组件调用）
 * @param params，参数，num：数量，giftcard_ids：礼品卡id，多个逗号隔开，category_id：礼品卡分类id，order：排序方式（综合：default，销量：sale_num，价格：price）
 */
export function getGiftCardListByComponents(params: Record<string, any>) {
    return request.get(`shop_giftcard/giftcard/components`, params)
}

/**
 * 获取礼品卡活动详情
 * @param giftcard_id   礼品卡id
 */
export function getGiftCardDetail(giftcard_id: any) {
    return request.get(`shop_giftcard/giftcard/${ giftcard_id }`)
}

/**
 * 获取礼品卡设置
 */
export function getGiftCardConfig() {
    return request.get(`shop_giftcard/config`)
}