import request from '@/utils/request'

/**
 * 获取分销等级列表
 * @param params
 * @returns
 */
export function getFenxiaoLevelList(params: Record<string, any>) {
    return request.get(`shop_fenxiao/fenxiao_level`, { params })
}

/**
 * 获取分销等级列表【不分页】
 * @returns
 */
export function getFenxiaoLevelListPage() {
    return request.get(`shop_fenxiao/fenxiao_level_select`)
}

/**
 * 获取分销等级详情
 * @param level_id 分销等级level_id
 * @returns
 */
export function getFenxiaoLevelInfo(level_id: number) {
    return request.get(`shop_fenxiao/fenxiao_level/${ level_id }`);
}

/**
 * 获取分销等级权重
 */
export function getFenxiaoLevelNum() {
    return request.get('shop_fenxiao/fenxiao_level_num');
}

/**
 * 获取分销等级升级条件卡片
 */
export function getFenxiaoLevelCard(params: Record<string, any>) {
    return request.get('shop_fenxiao/fenxiao_level_card', { params });
}

/**
 * 添加分销等级
 * @param params
 * @returns
 */
export function addFenxiaoLevel(params: Record<string, any>) {
    return request.post('shop_fenxiao/fenxiao_level', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑分销等级
 * @param params
 * @returns
 */
export function editFenxiaoLevel(params: Record<string, any>) {
    return request.put(`shop_fenxiao/fenxiao_level/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 删除分销等级
 * @param id
 * @returns
 */
export function deleteFenxiaoLevel(id: number) {
    return request.delete(`shop_fenxiao/fenxiao_level/${ id }`, { showErrorMessage: true, showSuccessMessage: true })
}
