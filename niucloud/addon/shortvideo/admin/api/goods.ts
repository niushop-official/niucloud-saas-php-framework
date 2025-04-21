import request from '@/utils/request'


export function getGoodsPageList(params: Record<string, any>) {
    return request.get(`shop/goods`, { params })
}
/**
 * 获取商品类型
 * @returns
 */
export function getGoodsType() {
    return request.get(`shop/goods/type`);
}

/**
 * 获取商品选择分页列表
 * @param params
 * @returns
 */
export function getGoodsSelectPageList(params: Record<string, any>) {
    return request.get(`shop/goods/select`, { params })
}
/**
 * 获取商品分类树结构
 * @returns
 */
export function getCategoryTree() {
    return request.get(`shop/goods/tree`)
}

/**
 * 获取商品分类列表
 * @param params
 * @returns
 */
export function getCategoryList(params: Record<string, any>) {
    return request.get(`shop/goods/category`, { params })
}

export function getGoodsSkuNoPageList(params: Record<string, any>) {
    return request.get(`shop/goods/selectgoodssku`, { params })
}