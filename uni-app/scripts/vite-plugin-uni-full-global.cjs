/**
 * H5 分构建 Core：tree-shaking 模式下 window.uni 仅为 {}，addon 动态页无法调用 navigateTo 等 API。
 * 将 pages-json 生成的 window.uni = {} 替换为完整 uni 对象挂载。
 */
function createUniFullGlobalPlugin() {
    const emptyGlobalRe =
        /import \{ upx2px, getApp \} from '@dcloudio\/uni-h5';(\w+)\.uni = \{\};(\w+)\.wx = \{\};(\w+)\.rpx2px = upx2px/

    const fullGlobal = `import { uni, upx2px, getApp, getCurrentPages, UniServiceJSBridge, UniViewJSBridge } from '@dcloudio/uni-h5'
$1.getApp = getApp
$1.getCurrentPages = getCurrentPages
$1.wx = uni
$1.uni = uni
$1.UniViewJSBridge = UniViewJSBridge
$1.UniServiceJSBridge = UniServiceJSBridge
$1.rpx2px = upx2px
$1.__setupPage = (com)=>setupPage(com)`

    return {
        name: 'uni-full-global',
        enforce: 'post',
        transform(code) {
            if (!code.includes('.uni = {}') || !emptyGlobalRe.test(code)) return null
            console.log('[uni-full-global] mount full uni on window (split build)')
            return {
                code: code.replace(emptyGlobalRe, fullGlobal),
                map: null
            }
        }
    }
}

module.exports = { createUniFullGlobalPlugin }
