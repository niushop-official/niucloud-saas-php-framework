import request from '@/utils/request'

/**
 * 获取核销信息
 */
export function getVerifyCode(type: string, params: AnyObject) {
    return request.get('verify', { type, data: params })
}

/**
 * 获取核销记录
 */
export function getVerifyRecords(params: Record<string, any>) {
    return request.get('verify_records', params)
}

/**
 * 判断是否是核销员
 */
export function getCheckVerifier() {
    return request.get('check_verifier')
}

/**
 * 获取核销信息
 */
export function getVerifierInfo(params: Record<string, any>) {
    return request.get(`get_verify_by_code`,params)
}

/**
 * 核销
 */
export function verify(code: string) {
    return request.post(`verify/${ code }`, {}, { showErrorMessage: true })
}

/**
 * 获取核销详情
 */
export function getVerifyDetail(code: string) {
    return request.get(`verify_detail/${ code }`, {}, { showErrorMessage: true })
}
