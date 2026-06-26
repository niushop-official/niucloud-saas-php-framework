/**
 * 微信小程序构建后处理（原 publish.cjs 逻辑，支持自定义目录）
 */
const fs = require('fs')
const path = require('path')

function handleWeappDiyDynamicBridge(mpDir) {
    const candidates = [
        path.join(mpDir, 'components/diy-dynamic-bridge/index.json'),
        path.join(mpDir, 'components/diy-dynamic-bridge/diy-dynamic-bridge.json')
    ]
    for (const src of candidates) {
        try {
            const data = JSON.parse(fs.readFileSync(src, 'utf8'))
            data.componentPlaceholder = data.componentPlaceholder || {}
            for (const key of Object.keys(data.usingComponents || {})) {
                if (!data.componentPlaceholder[key]) {
                    data.componentPlaceholder[key] = 'view'
                }
            }
            fs.writeFileSync(src, JSON.stringify(data))
        } catch {
            // skip
        }
    }

    const compRoot = path.join(mpDir, 'components')
    if (!fs.existsSync(compRoot)) return
    for (const name of fs.readdirSync(compRoot)) {
        if (!/^diy-dynamic-bridge/.test(name)) continue
        const jsonPath = path.join(compRoot, name, `${name}.json`)
        const altJson = path.join(compRoot, name, 'index.json')
        const target = fs.existsSync(jsonPath) ? jsonPath : altJson
        try {
            const data = JSON.parse(fs.readFileSync(target, 'utf8'))
            data.componentPlaceholder = data.componentPlaceholder || {}
            for (const key of Object.keys(data.usingComponents || {})) {
                if (!data.componentPlaceholder[key]) {
                    data.componentPlaceholder[key] = 'view'
                }
            }
            fs.writeFileSync(target, JSON.stringify(data))
        } catch {
            // skip
        }
    }
}

function handleWeappAddonComponents(mpDir) {
    const src = path.join(mpDir, 'addon/components/diy/group/index.json')
    try {
        const data = JSON.parse(fs.readFileSync(src, 'utf8'))
        data.componentPlaceholder = {}
        for (const key of Object.keys(data.usingComponents || {})) {
            data.componentPlaceholder[key] = 'view'
        }
        fs.writeFileSync(src, JSON.stringify(data))
    } catch {
        // diy-group 可能未编译进主包
    }
}

function handleWeappLanguage(mpDir) {
    const src = path.join(mpDir, 'locale/language.js')
    try {
        let content = fs.readFileSync(src, 'utf8')
        content = content.replace(/Promise\.resolve\(require\(("[^"]+")\)\)/g, 'require.async($1)')
        fs.writeFileSync(src, content)
    } catch (err) {
        console.warn('[mp-weixin-post] language.js skip:', err.message)
    }
}

function handleProjectConfig(mpDir) {
    const src = path.join(mpDir, 'project.config.json')
    try {
        const config = JSON.parse(fs.readFileSync(src, 'utf8'))
        config.setting = config.setting || {}
        config.setting.minifyWXML = false
        fs.writeFileSync(src, JSON.stringify(config))
    } catch (err) {
        console.warn('[mp-weixin-post] project.config skip:', err.message)
    }
}

function applyMpWeixinPost(mpDir) {
    const { ensureComponentSubpackagePlaceholderMp } = require('./mp-utils.cjs')
    ensureComponentSubpackagePlaceholderMp(mpDir)
    handleWeappAddonComponents(mpDir)
    handleWeappDiyDynamicBridge(mpDir)
    handleWeappLanguage(mpDir)
    handleProjectConfig(mpDir)
    console.log('[mp-weixin-post] applied ->', mpDir)
}

module.exports = {
    applyMpWeixinPost,
    handleWeappAddonComponents,
    handleWeappLanguage,
    handleProjectConfig
}
