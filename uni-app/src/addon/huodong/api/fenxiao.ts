
import request from '@/utils/request'
 

export function apply(data: AnyObject) {
    return request.post('huodong/fenxiao/apply', data, {showErrorMessage: true})
}

export function getmyfxuser(data: AnyObject) {
    return request.post('huodong/fenxiao/getmyfxuser', data, {showErrorMessage: true})
}

export function getteamList(data: AnyObject) {
    return request.post('huodong/fenxiao/teamlist', data, {showErrorMessage: true})
}
