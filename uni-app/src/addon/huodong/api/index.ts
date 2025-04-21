
import request from '@/utils/request'
 

export function getconfig(data: AnyObject) {
    return request.get('huodong/config', data, {showErrorMessage: true})
}