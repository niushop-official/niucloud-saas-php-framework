import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns
 */
export function getFenxiaoGoodsPageList(params: Record<string, any>) {
    return request.get(`shop_fenxiao/fenxiao_goods`, { params })
}

/**
 * 修改商品参与分销状态
 * @param params
 */
export function editGoodsIsFenxiao(params: Record<string, any>) {
    return request.put(`shop_fenxiao/fenxiao_goods/is_fenxiao`, params, { showSuccessMessage: true })
}

/**
 * 获取分销商品详情
 * @param id 商品id
 * @returns
 */
export function getFenxiaoGoodsInfo(id: number) {
    return request.get(`shop_fenxiao/fenxiao_goods_config/${ id }`);
}

/**
 * 设置佣金配置
 * @param params
 * @returns
 */
export function setFenxiaoGoodsInfo(params: Record<string, any>) {
    return request.put(`shop_fenxiao/fenxiao_goods/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    });
}
