
import request from '@/utils/request'

/***************************************************** hello world ****************************************************/

/**
 * 获取充值设置详情
 * @param id 充值设置id
 * @returns
 */
export function getConfigInfo(id: number = 0) {
    return request.get(`qiankun_recovery/config`);
}

/**
 * 添加充值设置
 * @param params
 * @returns
 */
export function addConfig(params: Record<string, any>) {
    return request.post('qiankun_recovery/config', params, {showErrorMessage: true, showSuccessMessage: true})
}