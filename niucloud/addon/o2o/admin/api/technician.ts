import request from '@/utils/request'


/***************************************************** 技师 ****************************************************/

/**
 * 获取技师列表(分页)
 * @param params
 * @returns
 */
export function getTechnicianList(params: Record<string, any>) {
    return request.get(`o2o/technician`, { params })
}

/**
 * 获取技师列表（不分页）
 * @returns
 */
export function getTechnicianListTo() {
    return request.get(`o2o/technician/list`)
}

/**
 * 获取技师列表（不分页 - 弹窗）
 * @returns
 */
export function getTechnicianSelectList(params: Record<string, any>) {
    return request.get(`o2o/technician/select`, { params })
}

/**
 * 添加技师
 * @param params
 * @returns
 */
export function addTechnician(params: Record<string, any>) {
    return request.post('o2o/technician/edit', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑技师
 * @param params
 * @returns
 */
export function editTechnician(params: Record<string, any>) {
    return request.put(`o2o/technician/edit/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 技师详情
 * @param id
 * @returns
 */
export function getTechnicianDetail(id: number) {
    return request.get(`o2o/technician/info/${ id }`)
}

/**
 * 删除技师
 * @param id
 * @returns
 */
export function deleteTechnician(id: number) {
    return request.delete(`o2o/technician/${ id }`, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 更改技师状态
 * @param params
 * @returns
 */
export function editTechnicianStatus(params: Record<string, any>) {
    return request.put(`o2o/technician/status/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取技师列表(关联会员)
 * @returns
 */
export function getMemberList(params: Record<string, any>) {
    return request.get(`o2o/technician/member`, { params })
}

/**
 * 获取技师列表(支持商品)
 * @param params
 * @returns
 */
export function getTechnicianGoods(params: Record<string, any>) {
    return request.get(`o2o/technician/goods/${ params.id }`, { params })
}

/***************************************************** 技师岗位 ****************************************************/
/**
 * 获取岗位列表
 * @param params
 * @returns
 */
export function getPositionList(params: Record<string, any>) {
    return request.get(`o2o/position`, { params })
}

/**
 * 获取岗位列表（不分页）
 * @returns
 */
export function getPositionListTo() {
    return request.get(`o2o/position/list`)
}

/**
 * 添加岗位
 * @param params
 * @returns
 */
export function addPosition(params: Record<string, any>) {
    return request.post('o2o/position/edit', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑岗位
 * @returns
 */
export function editPosition(params: Record<string, any>) {
    return request.put(`o2o/position/edit/${ params.id }`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 岗位详情
 * @returns
 */
export function getPositionDetail(id: number) {
    return request.get(`o2o/position/${ id }`)
}

/**
 * 删除岗位
 * @returns
 */
export function deletePosition(id: number) {
    return request.delete(`o2o/position/${ id }`, { showErrorMessage: true, showSuccessMessage: true })
}


