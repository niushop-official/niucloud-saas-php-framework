import request from '@/utils/request'

/**
 * 获取销售奖励配置
 */
export function getSaleConfig() {
    return request.get('shop_fenxiao/sale_config');
}

/**
 * 设置销售奖励配置
 * @param params
 * @returns
 */
export function setSaleConfig(params: Record<string, any>) {
    return request.put(`shop_fenxiao/sale_config`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 获取销售奖励结算周期类型
 */
export function getSalePeriodType() {
    return request.get('shop_fenxiao/sale_period_type');
}


/**
 * 获取销售奖励发放方式
 */
export function getSaleSendType() {
    return request.get('shop_fenxiao/sale_send_type');
}

/**
 * 获取销售奖励周期列表
 */
export function getSalePeriodList(params: Record<string, any>) {
    return request.get('shop_fenxiao/sale', { params });
}

/**
 * 销售奖励发放
 */
export function setSaleSend(id: number) {
    return request.post(`shop_fenxiao/sale_send/${ id }`);
}

/**
 * 获取销售奖励明细列表
 */
export function getSalePeriodInfo(id: number) {
    return request.get(`shop_fenxiao/sale/${ id }`);
}

/**
 * 获取销售奖励结算会员列表
 */
export function getSalePeriodMemberList(params: Record<string, any>) {
    return request.get('shop_fenxiao/sale_member', { params });
}
