import request from '@/utils/request'

/**
 * 获取限时折扣轮播
 * @returns
 */
export function getActiveDiscountConfig() {
    return request.get(`shop/discount/config`);
}

/**
 * 获取限时折扣列表
 * @returns
 */
export function getActiveDiscountList(params: Record<string, any>) {
    return request.get(`shop/discount`, params)
}

/**
 * 获取限时折扣商品列表
 * @returns
 */
export function getActiveDiscountGoodsList(params: Record<string, any>) {
    return request.get(`shop/discount/goods`, params)
}