
import request from '@/utils/request'
 
export function duihuan_point_balance(data) {
    return request.get(`transfer/duihuan/point_balance`,data)
}

export function duihuan_balance_point(data) {
    return request.get(`transfer/duihuan/balance_point`,data)
}


export function duihuan_commission_balance(data) {
    return request.get(`transfer/duihuan/commission_balance`,data)
}


