import request from '@/utils/request'

// USER_CODE_BEGIN -- ttcard_sys
/**
 * 获取配置
 * @param params
 * @returns
 */
export function getSys(params: Record<string, any>) {
    return request.get(`ttcard/sys`, {params})
}

/**
 * 保存配置
 * @param params
 * @returns
 */
export function editSys(params: Record<string, any>) {
    return request.post('ttcard/sys/edit', params, { showErrorMessage: true, showSuccessMessage: true })
}
// USER_CODE_END -- ttcard_sys