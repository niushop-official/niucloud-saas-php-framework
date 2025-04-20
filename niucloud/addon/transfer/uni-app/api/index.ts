
import request from '@/utils/request'

export function getConfig() {
    return request.get(`transfer/config`)
}