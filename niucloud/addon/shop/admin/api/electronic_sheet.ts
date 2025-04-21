import request from '@/utils/request'

/**
 * 获取电子面单分页列表
 * @param params
 * @returns
 */
export function getElectronicSheetPageList(params: Record<string, any>) {
    return request.get(`shop/electronic_sheet`, { params })
}

/**
 * 获取电子面单列表
 * @param params
 * @returns
 */
export function getElectronicSheetList(params: Record<string, any>) {
    return request.get(`shop/electronic_sheet/list`, { params })
}

/**
 * 获取电子面单详情
 * @param id 电子面单id
 * @returns
 */
export function getElectronicSheetInfo(id: number) {
    return request.get(`shop/electronic_sheet/${ id }`);
}

/**
 * 添加电子面单
 * @param params
 * @returns
 */
export function addElectronicSheet(params: Record<string, any>) {
    return request.post('shop/electronic_sheet', params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 编辑电子面单
 * @param params
 * @returns
 */
export function editElectronicSheet(params: Record<string, any>) {
    return request.put(`shop/electronic_sheet/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除电子面单
 * @param id
 * @returns
 */
export function deleteElectronicSheet(id: number) {
    return request.delete(`shop/electronic_sheet/${ id }`, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 设置默认电子面单模板
 * @param params
 * @returns
 */
export function setDefaultElectronicSheet(params: Record<string, any>) {
    return request.put(`shop/electronic_sheet/setDefault/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 设置电子面单 设置
 * @param params
 * @returns
 */
export function setElectronicSheetConfig(params: Record<string, any>) {
    return request.post('shop/electronic_sheet/config', params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取电子面单配置
 * @returns
 */
export function getElectronicSheetConfig() {
    return request.get(`shop/electronic_sheet/config`)
}

/**
 * 获取邮费支付方式类型
 * @returns
 */
export function getElectronicSheetPayType() {
    return request.get(`shop/electronic_sheet/paytype`)
}

/**
 * 打印电子面单
 * @param params
 * @returns
 */
export function printElectronicSheet(params: Record<string, any>) {
    return request.post('shop/electronic_sheet/print', params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}