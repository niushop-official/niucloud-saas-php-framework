import request from '@/utils/request'

/**
 * 获取礼品卡素材分页列表
 * @param params
 * @returns
 */
export function getMaterialPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/material`, { params })
}

/**
 * 获取礼品卡素材列表
 * @param params
 * @returns
 */
export function getMaterialList(params: Record<string, any>) {
    return request.get(`shop_giftcard/material/list`, { params })
}

/**
 * 获取礼品卡素材详情
 * @param material_id 礼品卡素材material_id
 * @returns
 */
export function getMaterialInfo(material_id: number) {
    return request.get(`shop_giftcard/material/${ material_id }`);
}

/**
 * 添加礼品卡素材
 * @param params
 * @returns
 */
export function addMaterial(params: Record<string, any>) {
    return request.post('shop_giftcard/material', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑礼品卡素材
 * @param params
 */
export function editMaterial(params: Record<string, any>) {
    return request.put(`shop_giftcard/material/${ params.material_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除礼品卡素材
 * @param params
 * @returns
 */
export function deleteMaterial(params: any) {
    return request.delete(`shop_giftcard/material`, { data: params, showSuccessMessage: true, showErrorMessage: true })
}

/**
 * 修改 礼品卡素材分组
 * @param params
 */
export function editMaterialGroupId(params: Record<string, any>) {
    return request.put(`shop_giftcard/material/modifyGroupId`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取礼品卡素材分组分页列表
 * @param params
 * @returns
 */
export function getMaterialGroupPageList(params: Record<string, any>) {
    return request.get(`shop_giftcard/material/group`, { params })
}

/**
 * 获取礼品卡素材分组列表
 * @param params
 * @returns
 */
export function getMaterialGroupList(params: Record<string, any>) {
    return request.get(`shop_giftcard/material/group/list`, { params })
}

/**
 * 获取礼品卡素材分组详情
 * @param group_id 礼品卡素材分组group_id
 * @returns
 */
export function getMaterialGroupInfo(group_id: number) {
    return request.get(`shop_giftcard/material/group/${ group_id }`);
}

/**
 * 添加礼品卡素材分组
 * @param params
 * @returns
 */
export function addMaterialGroup(params: Record<string, any>) {
    return request.post('shop_giftcard/material/group', params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 编辑礼品卡素材分组
 * @param params
 */
export function editMaterialGroup(params: Record<string, any>) {
    return request.put(`shop_giftcard/material/group/${ params.group_id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除礼品卡素材分组
 * @param group_id
 * @returns
 */
export function deleteMaterialGroup(group_id: number) {
    return request.delete(`shop_giftcard/material/group/${ group_id }`, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 修改礼品卡素材分组排序号
 * @param params
 */
export function modifyMaterialGroupSort(params: Record<string, any>) {
    return request.put(`shop_giftcard/material/group/sort`, params, { showSuccessMessage: true })
}