import request from '@/utils/request'



export function setting(params: Record<string, any>) {
    return request.post(`zxprint/setting`, params)
}

export function getsetting() {
    return request.post(`zxprint/getsetting`)
}
