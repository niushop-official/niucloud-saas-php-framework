import request from '@/utils/request'

/**
 * 获取分销设置
 */
export function getFenxiaoConfig() {
    return request.get('shop_fenxiao/config/fenxiao');
}

/**
 * 编辑分销设置
 * @param params
 * @returns
 */
export function setFenxiaoConfig(params: Record<string, any>) {
    return request.put('shop_fenxiao/config/fenxiao', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取分销海报设置
 */
export function getFenxiaoPosterConfig() {
    return request.get('shop_fenxiao/config/fenxiao_poster');
}

/**
 * 编辑分销海报设置
 * @param params
 * @returns
 */
export function setFenxiaoPosterConfig(params: Record<string, any>) {
    return request.put('shop_fenxiao/config/fenxiao_poster', params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}
