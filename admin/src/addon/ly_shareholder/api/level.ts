import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_shareholder_level
/**
 * 获取股东等级列表
 * @param params
 * @returns
 */
export function getShareholderLevelList(params: Record<string, any>) {
    return request.get(`ly_shareholder/shareholder_level`, {params})
}

/**
 * 获取股东等级列表【不分页】
 * @returns
 */
export function getShareholderLevelListPage() {
    return request.get(`ly_shareholder/shareholder_level_select`)
}

/**
 * 获取股东等级详情
 * @param level_id 股东等级level_id
 * @returns
 */
export function getShareholderLevelInfo(level_id: number) {
    return request.get(`ly_shareholder/shareholder_level/${level_id}`);
}

/**
 * 获取股东等级权重
 */
export function getShareholderLevelNum() {
    return request.get('ly_shareholder/shareholder_level_num');
}
/**
 * 获取股东等级升级条件卡片
 */
export function getShareholderLevelCard(params: Record<string, any>) {
    return request.get('ly_shareholder/shareholder_level_card',{params});
}
/**
 * 添加股东等级
 * @param params
 * @returns
 */
export function addShareholderLevel(params: Record<string, any>) {
    return request.post('ly_shareholder/shareholder_level', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑股东等级
 * @param params
 * @returns
 */
export function editShareholderLevel(params: Record<string, any>) {
    return request.put(`ly_shareholder/shareholder_level/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除股东等级
 * @param id
 * @returns
 */
export function deleteShareholderLevel(id: number) {
    return request.delete(`ly_shareholder/shareholder_level/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}



// USER_CODE_END -- ly_shareholder_level
