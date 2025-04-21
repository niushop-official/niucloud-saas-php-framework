import request from '@/utils/request'

/***************************************************** qiankun recharge ****************************************************/
export function qiankunRechargeConfig() {
    return request.get(`qiankun_recharge/config`)
}

