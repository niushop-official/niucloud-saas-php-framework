import request from '@/utils/request'

/**
 * 获取商品分类模板配置
 */
export function getGoodsCategoryConfig() {
    return request.get(`shop/goods/category/config`)
}

/**
 * 获取商品分类树结构
 */
export function getGoodsCategoryTree() {
    return request.get(`shop/goods/category/tree`)
}

/**
 * 获取商品分类列表
 */
export function getGoodsCategoryList(params: Record<string, any>) {
    return request.get(`shop/goods/category/list`, params)
}

/**
 * 获取商品列表
 */
export function getGoodsPages(params: Record<string, any>) {
    return request.get(`shop/goods/pages`, params)
}

/**
 * 获取商品详情
 */
export function getGoodsDetail(params: Record<string, any>) {
    return request.get(`shop/goods/detail`, params)
}

/**
 * 获取商品规格
 */
export function getGoodsSku(sku_id: any) {
    return request.get(`shop/goods/sku/${ sku_id }`)
}

/**
 * 收藏列表
 */
export function getCollectList(params: Record<string, any>) {
    return request.get(`shop/goods/collect`, params)
}

/**
 * 取消收藏
 */
export function cancelCollect(params: Record<string, any>) {
    return request.put(`shop/goods/collect`, params, { showSuccessMessage: true })
}

/**
 *  收藏
 */
export function collect(goods_id: any) {
    return request.post(`shop/goods/collect/${ goods_id }`)
}


/**
 * 获取评价
 */
export function getEvaluateList(goods_id: any) {
    return request.get(`shop/goods/evaluate/list`, { goods_id })
}

/**
 * 获取商品列表供组件调用
 */
export function getGoodsComponents(params: Record<string, any>) {
    return request.get(`shop/goods/components`, params)
}

/**
 * 获取商品满减信息
 */
export function getManjian(params: Record<string, any>) {
    return request.get(`shop/manjian/info`, params)
}

/**
 *  商品足迹添加
 */
export function browse(params: Record<string, any>) {
    return request.post(`shop/goods/browse`, params, { showSuccessMessage: false })
}

/**
 *  商品足迹列表
 */
export function getBrowse(params: Record<string, any>) {
    return request.get(`shop/goods/browse`, params)
}

/**
 * 商品足迹删除
 */
export function delBrowse(params: Record<string, any>) {
    return request.delete(`shop/goods/browse`, params)
}

/**
 *  获取商品搜索配置
 */
export function getGoodsConfigSearch() {
    return request.get(`shop/goods/config/search`)
}