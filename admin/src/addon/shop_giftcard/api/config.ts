import request from '@/utils/request'

/**
 * 获取礼品卡设置
 */
export function getGiftcardConfig() {
    return request.get('shop_giftcard/config');
}

/**
 * 编辑礼品卡设置
 * @param params
 * @returns
 */
export function setGiftcardConfig(params: Record<string, any>) {
    return request.put('shop_giftcard/config', params, { showErrorMessage: true, showSuccessMessage: true })
}
