import request from '@/utils/request'

/***************************************************** 技师 ****************************************************/
/**
 * 获取技师列表(分页)
 * @returns
 */
export function getTechnicianList(params: Record<string, any>) {
    return request.get(`o2o/technician`, params)
}

/**
 * 获取技师列表(不分页)
 * @returns
 */
export function getTechnicianListTo() {
    return request.get(`o2o/technician/list`)
}

/**
 * 获取技师列表支持商品
 * @param id
 * @returns
 */
export function getTechnicianGoods(id: number) {
    return request.get(`o2o/technician/goods/${ id }`)
}

/**
 * 技师详情
 * @param id
 * @returns
 */
export function getTechnicianDetail(id: number) {
    return request.get(`o2o/technician/${ id }`)
}

/**
 * 验证是否是技师
 */
export function checkTechnician() {
    return request.get(`o2o/checktechnician`)
}
