import request from '@/utils/request'

/**
 * 获取2+1设置
 */
export function getLianConfig() {
    return request.get('ly_lian/config');
}

/**
 * 编辑2+1设置
 * @param params
 * @returns
 */
export function setLianConfig(params: Record<string, any>) {
    return request.put('ly_lian/config', params, { showErrorMessage: true, showSuccessMessage: true })
}




