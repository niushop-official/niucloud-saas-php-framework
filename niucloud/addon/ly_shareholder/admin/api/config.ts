import request from '@/utils/request'

/**
 * 获取股东分红设置
 */
export function getShareholderConfig() {
    return request.get('ly_Shareholder/config');
}

/**
 * 编辑股东分红设置
 * @param params
 * @returns
 */
export function setShareholderConfig(params: Record<string, any>) {
    return request.put('ly_Shareholder/config', params, { showErrorMessage: true, showSuccessMessage: true })
}


export function getWithMemberLevelList(params: Record<string,any>){
    return request.get('ly_Shareholder/memberLevel', {params})
}

export function getWithFenxiaoLevelList(params: Record<string,any>){
    return request.get('ly_Shareholder/fenxiaoLevel', {params})
}

