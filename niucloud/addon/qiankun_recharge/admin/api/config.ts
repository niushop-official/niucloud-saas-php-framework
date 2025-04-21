import request from '@/utils/request'

// USER_CODE_BEGIN -- qiankun_recharge_config

/**
 * 获取充值设置详情
 * @param id 充值设置id
 * @returns
 */
export function getConfigInfo(id: number = 0) {
    return request.get(`qiankun_recharge/config`);
}

/**
 * 添加充值设置
 * @param params
 * @returns
 */
export function addConfig(params: Record<string, any>) {
    return request.post('qiankun_recharge/config', params, {showErrorMessage: true, showSuccessMessage: true})
}


// USER_CODE_END -- qiankun_recharge_config
