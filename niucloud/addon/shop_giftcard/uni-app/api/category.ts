import request from '@/utils/request'

// ************************************** 礼品卡分类 **************************************

/**
 * 获取礼品卡分类列表
 */
export function getGiftCardCategoryList() {
    return request.get(`shop_giftcard/category`)
}