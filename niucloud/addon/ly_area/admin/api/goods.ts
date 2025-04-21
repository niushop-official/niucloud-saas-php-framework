import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns
 */
export function getAreaGoodsPageList(params: Record<string, any>) {
    return request.get(`ly_area/area_goods`, {params})
}

/**
 * 修改商品参与区域分红
 * @param params
 */
export function editGoodsIsArea(params: Record<string, any>) {
    return request.put(`ly_area/area_goods/is_area`, params, {showSuccessMessage: true})
}

/**
 * 获取区域分红商品详情
 * @param id 商品id
 * @returns
 */
export function getAreaGoodsInfo(id: number) {
    return request.get(`ly_area/area_goods_config/${id}`);
}

/**
 * 设置区域分红奖励配置
 * @param params
 * @returns
 */
export function setAreaGoodsInfo(params: Record<string, any>) {
    return request.put(`ly_area/area_goods/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true });
}