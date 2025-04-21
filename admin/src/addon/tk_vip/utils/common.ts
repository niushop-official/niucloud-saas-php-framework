import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useCssVar, useTitle } from '@vueuse/core'
import colorFunction from 'css-color-function'
import storage from './storage'

export function dateChange(date) {
    return new Date(date).getTime() // 将日期值转换为时间戳
}
export function timeChange(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
