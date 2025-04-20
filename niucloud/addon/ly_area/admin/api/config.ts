import request from '@/utils/request'

/**
 * 获取2+1设置
 */
export function getAreaConfig() {
    return request.get('ly_area/config');
}

/**
 * 编辑2+1设置
 * @param params
 * @returns
 */
export function setAreaConfig(params: Record<string, any>) {
    return request.put('ly_area/config', params, { showErrorMessage: true, showSuccessMessage: true })
}




