
import request from '@/utils/request'

/***************************************************** hello world ****************************************************/
export function getIndexData() {
    return request.get(`qiankun_vip_card/index`)
}

