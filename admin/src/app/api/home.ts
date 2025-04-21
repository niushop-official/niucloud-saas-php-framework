import request from '@/utils/request'

export function getHomeSite(params: Record<string, any>) {
    return request.get(`home/site`, { params })
}

/**
 * 查询站点套餐
 */
export function getSiteGroup() {
    return request.get(`home/site/group`)
}

/**
 * 创建站点套餐
 */
export function createSite(params: Record<string, any>) {
    return request.post(`home/site/create`, params)
}
