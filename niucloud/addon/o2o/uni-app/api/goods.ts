import request from '@/utils/request'

/***************************************************** 项目管理 ****************************************************/
/**
 * 项目分类
 * @returns
 */
export function getCategory() {
    return request.get('o2o/category')
}

/**
 * 项目列表(分页)
 * @param params
 * @returns
 */
export function getGoodsList(params: Record<string, any>) {
    return request.get(`o2o/goods`, params)
}

/**
 * 项目详情
 * @param params
 * @returns
 */
export function getGoodsDetail(params: Record<string, any>) {
    return request.get(`o2o/goods/detail`, params)
}

/**
 * 获取项目列表供组件调用
 */
export function getGoodsComponents(params: Record<string, any>) {
    return request.get(`o2o/goods/components`, params)
}

/**
 * 预约设置
 * @returns
 */
export function getReserveConfig() {
    return request.get('o2o/config/reserve')
}

/***************************************************** 收藏 ****************************************************/
/**
 * 添加收藏
 */
export function setCollect(data: AnyObject) {
    return request.post(`o2o/collect`, data)
}

/**
 * 查询收藏（单条）
 */
export function getCollect(data: AnyObject) {
    return request.get(`o2o/collect`, data)
}

/**
 * 取消收藏
 */
export function deleteCollect(id: number) {
    return request.delete(`o2o/collect/${ id }`)
}
