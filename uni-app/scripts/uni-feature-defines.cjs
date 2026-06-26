/**
 * uni-app 编译期特性开关（与 @dcloudio/uni-cli-shared initFeatures 默认值对齐）
 * shared/vue.js 由 uni-h5-vue 打包，须注入这些 define，否则运行时报 ReferenceError
 */
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./addon-utils.cjs')

function readRouterMode() {
    try {
        const manifest = JSON.parse(
            fs.readFileSync(path.join(ROOT, 'src', 'manifest.json'), 'utf8')
        )
        return manifest?.h5?.router?.mode === 'history' ? 'history' : 'hash'
    } catch {
        return 'hash'
    }
}

function getUniFeatureDefines() {
    const routerMode = readRouterMode()
    return {
        __UNI_FEATURE_WX__: false,
        __UNI_FEATURE_WXS__: true,
        __UNI_FEATURE_RPX__: true,
        __UNI_FEATURE_PROMISE__: false,
        __UNI_FEATURE_LONGPRESS__: true,
        __UNI_FEATURE_I18N_EN__: true,
        __UNI_FEATURE_I18N_ES__: true,
        __UNI_FEATURE_I18N_FR__: true,
        __UNI_FEATURE_I18N_ZH_HANS__: true,
        __UNI_FEATURE_I18N_ZH_HANT__: true,
        __UNI_FEATURE_UNI_CLOUD__: false,
        __UNI_FEATURE_I18N_LOCALE__: false,
        __UNI_FEATURE_NVUE__: false,
        __UNI_FEATURE_ROUTER_MODE__: routerMode,
        __UNI_FEATURE_PAGES__: true,
        __UNI_FEATURE_TABBAR__: true,
        __UNI_FEATURE_TABBAR_MIDBUTTON__: false,
        __UNI_FEATURE_TOPWINDOW__: false,
        __UNI_FEATURE_LEFTWINDOW__: false,
        __UNI_FEATURE_RIGHTWINDOW__: false,
        __UNI_FEATURE_RESPONSIVE__: false,
        __UNI_FEATURE_NAVIGATIONBAR__: true,
        __UNI_FEATURE_PULL_DOWN_REFRESH__: false,
        __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: true,
        __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: true,
        __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: true
    }
}

function toViteDefine(defines = getUniFeatureDefines()) {
    const out = {}
    for (const [key, val] of Object.entries(defines)) {
        out[key] = key === '__UNI_FEATURE_ROUTER_MODE__' ? JSON.stringify(val) : val
    }
    return out
}

function patchUniDefinesInCode(code) {
    let next = code
    for (const [key, val] of Object.entries(getUniFeatureDefines())) {
        const replacement = key === '__UNI_FEATURE_ROUTER_MODE__' ? JSON.stringify(val) : String(val)
        if (next.includes(key)) next = next.split(key).join(replacement)
    }
    return next
}

function patchVueJsFile(filePath) {
    if (!fs.existsSync(filePath)) return false
    const code = fs.readFileSync(filePath, 'utf8')
    const next = patchUniDefinesInCode(code)
    if (next === code) return false
    fs.writeFileSync(filePath, next, 'utf8')
    return true
}

module.exports = {
    getUniFeatureDefines,
    toViteDefine,
    patchUniDefinesInCode,
    patchVueJsFile
}
