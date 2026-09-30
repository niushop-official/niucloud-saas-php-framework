import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import iconfontCss from '@/styles/icon/iconfont.css?raw'
import { isUrl } from '@/utils/common'

export const DEFAULT_MENU_ICON = 'iconfont iconliebiaoV6xx1'

const elementIconNames = new Set(Object.keys(ElementPlusIconsVue))
const iconfontClassSet = new Set(
    [...iconfontCss.matchAll(/\.([A-Za-z_][\w-]*):{1,2}before/g)].map(item => item[1])
)

/**
 * 菜单图标不存在时回退到默认 iconfont。
 * 图片地址原样返回；iconfont 类名不在字体里、Element 图标未注册、或图标为空，都用默认图标。
 */
export function resolveMenuIcon(icon?: string) {
    const value = typeof icon === 'string' ? icon.trim() : ''
    if (!value) return DEFAULT_MENU_ICON
    if (isUrl(value)) return value

    const [type, name] = value.split(/\s+/)
    if (!type || !name) return DEFAULT_MENU_ICON
    if (type === 'element') {
        return elementIconNames.has(name) ? value : DEFAULT_MENU_ICON
    }
    if (type === 'iconfont') {
        return iconfontClassSet.has(name) ? value : DEFAULT_MENU_ICON
    }
    return DEFAULT_MENU_ICON
}
