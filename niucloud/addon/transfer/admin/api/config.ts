
import request from '@/utils/request'

export function getConfig() {
    return request.get('transfer/config/getconfig')
}

/**
 *配置修改
 * @param params
 */
export function setConfig(params: Record<string, any>) {
    return request.post(`transfer/config/setconfig`, params, { showSuccessMessage: true })
}
