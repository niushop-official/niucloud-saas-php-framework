
import request from '@/utils/request'
 

export function getActCategory(data: AnyObject) {
    return request.get('huodong/act/catelist', data, {showErrorMessage: true})
}
export function getActList(data: AnyObject) { 
    return request.get('huodong/act/list', data, {showErrorMessage: true})
}
export function getDetail(data: AnyObject) {
    return request.get('huodong/act/detail', data, {showErrorMessage: true})
}
export function getBanner() {
    return request.get('huodong/banner')
}
export function getnewsbao() {
    return request.get('huodong/newsbao')
}
export function getrank(data) {
    return request.get('huodong/rank',data)
}
export function getrankone(data) {
    return request.get('huodong/getrankone',data)
}
export function getconfig(data) {
    return request.get('huodong/config',data)
}
export function getMingdanList(data: AnyObject) { 
    return request.get('huodong/act/mingdan', data, {showErrorMessage: true})
}