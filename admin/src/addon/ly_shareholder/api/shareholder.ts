import request from '@/utils/request'

// USER_CODE_BEGIN -- ly_shareholder_log
/**
 * 获取股东分红记录列表
 * @param params
 * @returns
 */
export function getShareholderLogList(params: Record<string, any>) {
    return request.get(`ly_shareholder/shareholder_log`, {params})
}

/**
 * 获取股东分红记录详情
 * @param id 股东分红记录id
 * @returns
 */
export function getShareholderLogInfo(id: number) {
    return request.get(`ly_shareholder/shareholder_log/${id}`);
}

/**
 * 添加股东分红记录
 * @param params
 * @returns
 */
export function addShareholderLog(params: Record<string, any>) {
    return request.post('ly_shareholder/shareholder_log', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑股东分红记录
 * @param id
 * @param params
 * @returns
 */
export function editShareholderLog(params: Record<string, any>) {
    return request.put(`ly_shareholder/shareholder_log/${params.id}`, params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 删除股东分红记录
 * @param id
 * @returns
 */
export function deleteShareholderLog(id: number) {
    return request.delete(`ly_shareholder/shareholder_log/${id}`, { showErrorMessage: true, showSuccessMessage: true })
}

export function getWithFenxiaoLevelList(params: Record<string,any>){
    return request.get('ly_shareholder/fenxiaoLevel', {params})
}

// USER_CODE_END -- ly_shareholder_log


// USER_CODE_BEGIN -- ly_shareholder
/******************************* 股东 *************************************/

/**
 * 获取股东列表(用于弹框选择)（有分页）
 */
export function getSelectShareholderList(params: Record<string, any>) {
    return request.get('ly_shareholder/shareholder_of_select',{params});
}

/**
 * 获取股东列表(有分页)
 */
export function getShareholderPage(params: Record<string, any>) {
    return request.get('ly_shareholder/shareholder',{params});
}

/**
 * 新增股东
 * @param params
 * @returns
 */
export function addShareholder(params: Record<string, any>) {
    return request.post('ly_shareholder/shareholder',params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑股东
 * @param params 
 * @returns
 */
export function editShareholder(params: Record<string, any>) {
    return request.put(`ly_shareholder/shareholder/${params.id}`,params, { showErrorMessage: true, showSuccessMessage: true })
}
/**
 * 获取股东详情
 * @param id
 * @returns
 */
export function getShareholderInfo(id: number) {
    return request.get(`ly_shareholder/shareholder/${id}`);
}

/**
 * 获取股东佣金账户明细
 * @param params
 */
export function getShareholderAccount(params: Record<string, any>) {
    return request.get(`ly_shareholder/shareholder/account/${params.id}`,{params});
}

/**
 * 获取股东订单数据统计
 */
export function getShareholderOrderStat(id: number) {
    return request.get(`ly_shareholder/shareholder/stat/${id}`);
}

/**
 * 获取股东团队
 * @param params
 */
export function getShareholderTeam(params: Record<string, any>) {
    return request.get(`ly_shareholder/shareholder/team/${params.id}`,{params});
}

/**
 * 获取股东申请状态
 */
export function getShareholderApplayStatus() {
    return request.get('ly_shareholder/shareholder_apply_status');
}


export function shareholderSelectMemberPage(params: Record<string, any>) {
    return request.get('ly_shareholder/member_of_select',{params});
}

export function getMemberListOfSelect(params: Record<string, any>) {
    return request.get('ly_shareholder/member_of_select',{params});
}

// USER_CODE_END -- ly_shareholder