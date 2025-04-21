import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns
 */
export function getLianGoodsPageList(params: Record<string, any>) {
    return request.get(`ly_lian/lian_goods`, {params})
}

/**
 * 修改商品参与分销状态
 * @param params
 */
export function editGoodsIsLian(params: Record<string, any>) {
    return request.put(`ly_lian/lian_goods/is_lian`, params, {showSuccessMessage: true})
}

/**
 * 获取链动商品详情
 * @param id 商品id
 * @returns
 */
export function getLianGoodsInfo(id: number) {
    return request.get(`ly_lian/lian_goods_config/${id}`);
}

/**
 * 设置链动奖励配置
 * @param params
 * @returns
 */
export function setLianGoodsInfo(params: Record<string, any>) {
    return request.put(`ly_lian/lian_goods/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true });
}