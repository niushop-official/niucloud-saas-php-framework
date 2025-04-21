
import request from '@/utils/request'

/***************************************************** hello world ****************************************************/
export function getIndex() {
    return request.get(`qiankun_recovery/index`)
}

