import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns
 */
export function getShareholderGoodsPageList(params: Record<string, any>) {
    return request.get(`ly_shareholder/shareholder_goods`, {params})
}

/**
 * 修改商品参与股东分红状态
 * @param params
 */
export function editGoodsIsShareholder(params: Record<string, any>) {
    return request.put(`ly_shareholder/shareholder_goods/is_shareholder`, params, {showSuccessMessage: true})
}

/**
 * 获取股东商品详情
 * @param id 商品id
 * @returns
 */
export function getShareholderGoodsInfo(id: number) {
    return request.get(`ly_shareholder/shareholder_goods_config/${id}`);
}

/**
 * 设置佣金配置
 * @param params
 * @returns
 */
export function setShareholderGoodsInfo(params: Record<string, any>) {
    return request.put(`ly_shareholder/shareholder_goods/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true });
}