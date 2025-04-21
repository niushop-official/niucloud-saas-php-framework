import request from '@/utils/request'

export function getset(params: Record<string, any>) {
    return request.post(`shortvideo/getset`, params)
}
export function saveset(params: Record<string, any>) {
    return request.post(`shortvideo/saveset`, params)
}