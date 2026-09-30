import request from '@/utils/request'

/***************************************************** 统计信息 **************************************************/
/**
 * 获取统计信息
 */
export function getStatInfo() {
    return request.get(`stat/index`)
}

/**
 * 获取站点统计信息
 */
export function getSiteStatInfo() {
    return request.get(`stat/siteindex`)
}

/***************************************************** 插件运营面板 **************************************************/
/**
 * 插件运营面板-卡片列表
 */
export function getAddonPanelList() {
    return request.get(`stat/addon_panel`)
}

/**
 * 插件运营面板-插件统计详情
 * @param key 插件标识
 * @param params 查询参数（days: 7 / 30）
 */
export function getAddonPanelDetail(key: string, params?: Record<string, any>) {
    return request.get(`stat/addon_panel/${ key }`, { params })
}

/**
 * 插件运营面板-插件关联站点（即将到期 / 会员数排行）
 * @param key 插件标识
 */
export function getAddonPanelSites(key: string) {
    return request.get(`stat/addon_panel/${ key }/sites`)
}