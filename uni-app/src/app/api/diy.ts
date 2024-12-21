import request from '@/utils/request'

/**
 * 获取自定义页面信息
 */
export function getDiyInfo(params: Record<string, any>) {
    return request.get('diy/diy', params)
}

/**
 * 获取自定义表单信息
 */
export function getDiyFormInfo(form_id:number) {
    return request.get(`diy/form/${form_id}`)
}

/**
 * 获取底部导航列表
 */
export function getTabbarList(params: Record<string, any>) {
    return request.get('diy/tabbar/list', params)
}

/**
 * 获取页面分享信息
 */
export function getShareInfo(params: Record<string, any>) {
    return request.get('diy/share', params)
}

/**
 * 提交表单数据
 */
export function recordsForm(params: Record<string, any>) {
    return request.post('diy/form/records', params)
}