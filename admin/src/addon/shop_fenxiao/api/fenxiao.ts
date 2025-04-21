import request from '@/utils/request'

/******************************* 分销商 *************************************/

/**
 * 获取分销商列表(用于弹框选择)（有分页）
 */
export function getSelectFenxiaoList(params: Record<string, any>) {
    return request.get('shop_fenxiao/fenxiao_of_select', { params });
}

/**
 * 获取分销商列表(有分页)
 */
export function getFenxiaoPage(params: Record<string, any>) {
    return request.get('shop_fenxiao/fenxiao', { params });
}

/**
 * 新增分销商
 * @param params
 * @returns
 */
export function addFengxiao(params: Record<string, any>) {
    return request.post('shop_fenxiao/fenxiao', params, { showErrorMessage: true, showSuccessMessage: true })
}

/**
 * 编辑分销商
 * @param params
 * @returns
 */
export function editFengxiao(params: Record<string, any>) {
    return request.put(`shop_fenxiao/fenxiao/${ params.id }`, params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取分销商详情
 * @param id
 * @returns
 */
export function getFenxiaoInfo(id: number) {
    return request.get(`shop_fenxiao/fenxiao/${ id }`);
}

/**
 * 获取分销商佣金账户明细
 * @param params
 */
export function getFenxiaoAccount(params: Record<string, any>) {
    return request.get(`shop_fenxiao/fenxiao/account/${ params.id }`, { params });
}

/**
 * 获取分销商团队
 * @param params
 */
export function getFenxiaoTeam(params: Record<string, any>) {
    return request.get(`shop_fenxiao/fenxiao/team/${ params.id }`, { params });
}


/******************************* 分销商申请 *************************************/

/**
 * 获取分销商申请列表(有分页)
 */
export function getFenxiaoApplayPage(params: Record<string, any>) {
    return request.get('shop_fenxiao/fenxiao_apply', { params });
}

/**
 * 分销商申请审核通过
 * @param apply_id
 * @returns
 */
export function agreeFengxiao(apply_id: number) {
    return request.put(`shop_fenxiao/fenxiao_apply_audit/agree/${ apply_id }`, {}, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 分销商申请审核拒绝
 * @param apply_id
 * @param refuse_reason
 * @returns
 */
export function refuseFengxiao(apply_id: number, refuse_reason: string) {
    return request.put(`shop_fenxiao/fenxiao_apply_audit/refuse/${ apply_id }`, { refuse_reason }, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}

/**
 * 获取分销商申请状态
 */
export function getFenxiaoApplayStatus() {
    return request.get('shop_fenxiao/fenxiao_apply_status');
}

/******************************* 分销会员分页列表 *************************************/
/**
 * 分销会员分页列表(有分页)
 */
export function fenxiaoMemberPage(params: Record<string, any>) {
    return request.get('shop_fenxiao/fenxiao_member', { params });
}

/**
 * 分销会员分页列表(有分页)
 */
export function fenxiaoSelectMemberPage(params: Record<string, any>) {
    return request.get('shop_fenxiao/member_of_select', { params });
}

/**
 * 换绑会员所属分销商
 * @param params
 * @returns
 */
export function setModifyFenxiao(params: Record<string, any>) {
    return request.put('shop_fenxiao/fenxiao_member/modify_fenxiao', params, {
        showErrorMessage: true,
        showSuccessMessage: true
    })
}